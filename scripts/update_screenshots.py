"""Regenerate the README Screenshots gallery from the screenshots/ folder.

Usage:
    python scripts/update_screenshots.py

Scans screenshots/ for image files, sorts them by filename, and replaces
everything between <!-- SCREENSHOTS:START --> and <!-- SCREENSHOTS:END -->
in README.md. Captions come from filenames:
    dashboard-overview.png -> Dashboard Overview
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SHOT_DIR = ROOT / "screenshots"
README = ROOT / "README.md"
START = "<!-- SCREENSHOTS:START -->"
END = "<!-- SCREENSHOTS:END -->"
EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}


def caption_for(path: Path) -> str:
    return path.stem.replace("-", " ").replace("_", " ").title()


def description_for(path: Path) -> str:
    """Optional per-image description from a <name>.txt sidecar file."""
    sidecar = path.with_suffix(".txt")
    if sidecar.exists():
        return sidecar.read_text(encoding="utf-8").strip()
    return ""


def main() -> None:
    images = sorted(
        (
            p
            for p in SHOT_DIR.iterdir()
            if p.is_file() and p.suffix.lower() in EXTS
        ),
        key=lambda p: p.name.lower(),
    )
    if images:
        parts = []
        for p in images:
            part = f"### {caption_for(p)}\n\n![{caption_for(p)}](screenshots/{p.name})"
            desc = description_for(p)
            if desc:
                part += f"\n\n{desc}"
            parts.append(part)
        block = "\n\n".join(parts) + "\n"
    else:
        block = (
            "_No screenshots yet — paste image files into `screenshots/` "
            "and run `python scripts/update_screenshots.py`._\n"
        )
    text = README.read_text(encoding="utf-8")
    if START not in text or END not in text:
        raise SystemExit("README markers not found")
    before, rest = text.split(START, 1)
    _, after = rest.split(END, 1)
    README.write_text(f"{before}{START}\n{block}{END}{after}", encoding="utf-8")
    print(f"Updated README gallery with {len(images)} image(s).")


if __name__ == "__main__":
    main()
