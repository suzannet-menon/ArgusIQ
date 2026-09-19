"""
Chat history persistence.
- Local dev: saves to chat_history.json on disk so history survives restarts.
- Vercel / serverless: file system is read-only/ephemeral, so falls back to in-memory only
  and frontend localStorage becomes the source of truth.
"""
import json
import os
from datetime import datetime
from pathlib import Path

HISTORY_FILE = Path(__file__).parent.parent / "chat_history.json"
MAX_HISTORY = 100

# In-memory cache (always available)
_memory_history: list[dict] = []

def _load_from_disk() -> list[dict]:
    try:
        if HISTORY_FILE.exists():
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, list):
                    return data[-MAX_HISTORY:]
    except Exception as e:
        print(f"[ChatHistory] load failed: {e}")
    return []

def _save_to_disk(history: list[dict]):
    try:
        # Vercel's filesystem is read-only except /tmp - try both locations
        for path in [HISTORY_FILE, Path("/tmp/chat_history.json")]:
            try:
                with open(path, "w", encoding="utf-8") as f:
                    json.dump(history[-MAX_HISTORY:], f, ensure_ascii=False, indent=2)
                break
            except Exception:
                continue
    except Exception as e:
        print(f"[ChatHistory] save failed: {e}")

# Initialize memory from disk on first import (local dev)
if not _memory_history and HISTORY_FILE.exists():
    _memory_history = _load_from_disk()

def get_history() -> list[dict]:
    return _memory_history.copy()

def add_exchange(user_message: str, assistant_reply: str, supplier_id: str | None = None):
    entry_user = {
        "role": "user",
        "text": user_message,
        "supplier_id": supplier_id,
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }
    entry_assistant = {
        "role": "assistant",
        "text": assistant_reply,
        "supplier_id": supplier_id,
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }
    _memory_history.extend([entry_user, entry_assistant])
    # trim
    if len(_memory_history) > MAX_HISTORY:
        del _memory_history[0 : len(_memory_history) - MAX_HISTORY]
    _save_to_disk(_memory_history)

def clear_history():
    _memory_history.clear()
    _save_to_disk([])
    # also try to delete files
    for path in [HISTORY_FILE, Path("/tmp/chat_history.json")]:
        try:
            if path.exists():
                path.unlink()
        except Exception:
            pass
