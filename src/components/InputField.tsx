type Props = {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
};

export default function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-sm text-text-muted font-medium">
          {label}
        </label>
        {error && (
          <span className="text-danger text-xs">{error}</span>
        )}
      </div>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 rounded border w-full outline-none transition
          ${
            error
              ? "border-danger"
              : "border-input-border focus:border-primary"
          }
        `}
        aria-invalid={!!error}
      />
    </div>
  );
}