import { useEffect, useRef } from "react";

export default function Modal({
  open,
  title,
  body,
  onConfirm,
  onCancel,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}: any) {
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    confirmRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-md bg-card rounded-md p-8 shadow-lg">
        {/* Title */}
        <h2
          id="modal-title"
          className="text-2xl md:text-3xl font-bold text-text mb-4"
        >
          {title}
        </h2>

        {/* Body */}
        <p className="text-text-muted text-sm mb-6 leading-relaxed">{body}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3 font-bold">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-full bg-bg text-text-muted hover:opacity-80 transition"
          >
            {cancelLabel}
          </button>

          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="px-6 py-3 rounded-full bg-danger text-white hover:bg-danger-hover transition"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
