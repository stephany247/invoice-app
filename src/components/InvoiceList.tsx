import { useState } from "react";
import { fmt, fmtDate, calcTotal } from "../utils/utils";
import StatusBadge from "./StatusBadge";
import FilterBar from "./FilterBar";
import type { Invoice, Status } from "../types/types";
import { FaPlus } from "react-icons/fa";
import emptyIllustration from "../assets/Email campaign_Flatline.svg";

export default function InvoiceList({ invoices, onCreate, onView }: any) {
  const [filters, setFilters] = useState<Record<Status, boolean>>({
    draft: true,
    pending: true,
    paid: true,
  });

  const toggleFilter = (s: Status) => setFilters((f) => ({ ...f, [s]: !f[s] }));

  const visible = invoices.filter((inv: Invoice) => filters[inv.status]);

  return (
    <div className="p-6 md:p-10 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-text">Invoices</h1>
          <p className="text-text-secondary text-sm">
            {visible.length === 0
              ? "No invoices"
              : `${visible.length} invoice${visible.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FilterBar filters={filters} onToggle={toggleFilter} />

          <button
            onClick={onCreate}
            className="bg-primary hover:bg-primary-light text-white px-2 py-2 rounded-full flex items-center gap-2 font-bold"
          >
            <span className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">
              <FaPlus />
            </span>
            <span className="inline md:hidden text-base pr-2">New</span>
            <span className="hidden md:inline">New Invoice</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center my-20 gap-6">
          <img
            src={emptyIllustration}
            alt="No invoices"
            className="w-48 md:w-64"
          />
          <p className="text-text font-bold text-2xl">There is nothing here</p>
          <p className="text-sm text-text-secondary w-6/10">
            Create an invoice by clicking the <strong>New</strong> button and
            get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((inv: any) => (
            <div
              key={inv.id}
              role="button"
              tabIndex={0}
              onClick={() => onView(inv)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onView(inv);
              }}
              className="bg-card hover:border hover:border-primary rounded-md p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition"
            >
              {/* Left */}
              <div className="flex justify-between md:flex-1 md:items-center">
                <p className="font-bold text-text">
                  <span className="text-text-muted">#</span>
                  {inv.id}
                </p>

                <p className="text-text-muted dark:text-text text-sm md:hidden">
                  {inv.client}
                </p>
              </div>

              {/* Middle */}
              <div className="flex justify-between md:flex-1 md:items-center">
                <p className="text-text-muted text-sm font-medium hidden">
                  Due {fmtDate(inv.dueDate)}
                </p>

                <p className="hidden md:block text-text-muted">{inv.client}</p>
              </div>

              {/* Right */}
              <div className="flex items-center justify-between md:justify-end gap-6 md:flex-1">
                <div className="flex flex-col justify-between">
                  <p className="text-text-muted text-sm md:hidden">
                    Due {fmtDate(inv.dueDate)}
                  </p>
                  <p className="font-bold text-text">
                    {fmt(calcTotal(inv.items))}
                  </p>
                </div>

                <StatusBadge status={inv.status} />

                <span className="hidden md:block text-primary text-lg">
                  &gt;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
