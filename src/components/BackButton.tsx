import { ChevronLeft } from "lucide-react";

export default function BackButton({
  onClick,
  label = "Go back",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 font-bold text-text hover:text-primary mb-6 transition"
    >
      <ChevronLeft className="text-primary size-4" />
      {label}
    </button>
  );
}