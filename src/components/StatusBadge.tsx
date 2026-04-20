type Status = "paid" | "pending" | "draft";

export default function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    paid: "bg-paid-bg text-paid",
    pending: "bg-pending-bg text-pending",
    draft: "bg-draft-bg text-draft",
  };

  return (
    <span
      className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium capitalize ${styles[status]}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          status === "paid"
            ? "bg-paid"
            : status === "pending"
            ? "bg-pending"
            : "bg-draft"
        }`}
      />
      {status}
    </span>
  );
}