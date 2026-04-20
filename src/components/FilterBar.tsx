import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Status = "draft" | "pending" | "paid";

const STATUSES: Status[] = ["draft", "pending", "paid"];

export default function FilterBar({
  filters,
  onToggle,
}: {
  filters: Record<Status, boolean>;
  onToggle: (s: Status) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open ? "true" : "false"}
        className="flex items-center gap-2 font-bold text-text hover:text-primary"
      >
        Filter
        <span className="hidden md:inline">by status</span>
        <ChevronDown
          className={`size-4 text-primary transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-4 w-48 bg-card border border-border rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50">
          {STATUSES.map((status) => (
            <label
              key={status}
              className="flex items-center gap-3 cursor-pointer text-sm font-medium text-text"
            >
              <input
                type="checkbox"
                checked={filters[status]}
                onChange={() => onToggle(status)}
                className="accent-primary w-4 h-4"
              />

              <span className="capitalize">{status}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
