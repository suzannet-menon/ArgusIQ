export default function SupplierNetwork({ className = "" }) {
  return (
    <svg viewBox="0 0 400 240" className={className} role="img" aria-label="Supplier risk network">
      <g stroke="#f59e0b" strokeOpacity="0.25" strokeWidth="1">
        <line x1="62" y1="60" x2="176" y2="36" />
        <line x1="176" y1="36" x2="302" y2="58" />
        <line x1="62" y1="60" x2="96" y2="120" />
        <line x1="96" y1="120" x2="58" y2="162" />
        <line x1="302" y1="58" x2="352" y2="130" />
        <line x1="302" y1="58" x2="268" y2="142" />
        <line x1="268" y1="142" x2="120" y2="214" />
        <line x1="268" y1="142" x2="250" y2="220" />
        <line x1="250" y1="220" x2="356" y2="226" />
        <line x1="120" y1="214" x2="58" y2="290" />
      </g>
      <g>
        <circle cx="62" cy="60" r="5.5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
        <circle cx="176" cy="36" r="5.5" fill="#e11d48" stroke="#fff" strokeWidth="1.5" />
        <circle cx="302" cy="58" r="5.5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
        <circle cx="352" cy="130" r="5.5" fill="#e11d48" stroke="#fff" strokeWidth="1.5" />
        <circle cx="268" cy="142" r="5.5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
        <circle cx="96" cy="120" r="5.5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
        <circle cx="120" cy="214" r="5.5" fill="#e11d48" stroke="#fff" strokeWidth="1.5" />
        <circle cx="250" cy="220" r="5.5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
        <circle cx="356" cy="226" r="5.5" fill="#e11d48" stroke="#fff" strokeWidth="1.5" />
        <circle cx="58" cy="290" r="5.5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
