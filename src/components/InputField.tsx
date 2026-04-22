type Props = {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  hideLabel?: boolean;
  compact?: boolean
};

export default function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  className,
  hideLabel,
  compact
}: Props) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className={`text-sm text-text-muted font-medium ${
            hideLabel ? "md:sr-only" : ""
          }`}
        >
          {label}
        </label>
        {error && <span className="text-danger text-xs">{error}</span>}
      </div>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={` ${compact ? "p-2 text-center" : "py-2 px-4"} rounded-sm border w-full outline-none transition dark:bg-light-btn
          ${
            error ? "border-danger" : "border-input-border focus:border-primary"
          }
        `}
        aria-invalid={error ? "true" : undefined}
      />
    </div>
  );
}
