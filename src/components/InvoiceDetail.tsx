import { useState } from "react";
import StatusBadge from "./StatusBadge";
import { fmt, fmtDate, calcTotal } from "../utils/utils";
import type { Item } from "../types/types";
import BackButton from "./BackButton";
import Modal from "./Modal";

export default function InvoiceDetail({
  invoice,
  onBack,
  onEdit,
  onDelete,
  onMarkPaid,
}: any) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const total = calcTotal(invoice.items);

  return (
    <>
      <div className="p-6 md:p-10 pt-28 md:pt-36 pb-16 lg:pt-16 max-w-3xl 2xl:max-w-4xl mx-auto">
        {/* Back */}
        <BackButton onClick={onBack} />

        {/* Action bar */}
        <section className="bg-card rounded-md p-6 flex items-center justify-between gap-4 mb-6">
          <div className="flex justify-between items-center gap-5 w-full md:w-auto">
            <p className="text-text-secondary text-sm font-medium">Status</p>
            <StatusBadge status={invoice.status} />
          </div>
          <div className="hidden md:flex gap-2 lg:gap-4 justify-end bg-card font-bold">
            <button
              onClick={() => onEdit(invoice)}
              className="px-6 py-3 rounded-full bg-light-btn text-text-muted hover:bg-text-muted/20 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 rounded-full bg-danger text-white hover:bg-danger-hover transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Delete
            </button>

            {invoice.status !== "paid" && (
              <button
                onClick={() => onMarkPaid(invoice.id)}
                className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-light transition-colors duration-300 ease-in-out cursor-pointer"
              >
                {invoice.status === "draft" ? "Send" : "Mark as Paid"}
              </button>
            )}
          </div>
        </section>

        {/* Card */}
        <section className="bg-card rounded-md p-6 md:p-8 font-medium">
          {/* Top */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            <div>
              <p className="font-bold text-text">
                <span className="text-text-muted">#</span>
                {invoice.id}
              </p>
              <p className="text-text-muted text-sm">{invoice.description}</p>
            </div>

            <div className="text-sm text-text-muted">
              <p>{invoice.fromAddress}</p>
              <p>{invoice.fromCity}</p>
              <p>{invoice.fromPostCode}</p>
              <p>{invoice.fromCountry}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 text-sm">
            <div>
              <div className="flex flex-col gap-2">
                <p className="text-text-muted">Invoice Date</p>
                <p className="font-bold text-text">
                  {fmtDate(invoice.createdAt)}
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <p className="text-text-muted">Payment Due</p>
                <p className="font-bold text-text">
                  {fmtDate(invoice.dueDate)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-text-muted">Bill To</p>
              <p className="font-bold text-text">{invoice.client}</p>
              <p className="text-text-muted">
                {invoice.address}
                <br />
                {invoice.city}
                <br />
                {invoice.postCode}
                <br />
                {invoice.country}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-text-muted">Sent to</p>
              <p className="font-bold text-text">{invoice.email}</p>
            </div>
          </div>

          {/* Items */}
          <div className="bg-bg rounded-t-md p-4 md:p-6">
            <div className="hidden md:grid grid-cols-4 text-text-muted text-sm mb-4">
              <span>Item Name</span>
              <span className="text-right">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            <div className="flex flex-col gap-4">
              {invoice.items.map((item: Item, i: number) => (
                <div
                  key={i}
                  className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center"
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-text">{item.name}</p>

                    <p className="text-text-secondary font-bold md:hidden">
                      {item.quantity} x {fmt(item.price)}
                    </p>
                  </div>

                  <p className="text-text-muted font-bold hidden md:block text-right">
                    {item.quantity}
                  </p>

                  <p className="hidden md:block text-right text-text-muted">
                    {fmt(item.price)}
                  </p>

                  <p className="font-bold text-right text-text">
                    {fmt(item.quantity * item.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-sidebar text-white rounded-b-md p-6 flex justify-between items-center mt-0">
            <span className="text-sm">Grand Total</span>
            <span className="text-2xl font-bold">{fmt(total)}</span>
          </div>
        </section>
      </div>
      <section className="flex gap-3 md:gap-4 justify-end bg-card p-6 font-bold md:hidden">
        <button
          onClick={() => onEdit(invoice)}
          className="px-6 py-3 rounded-full bg-light-btn text-text-muted hover:opacity-80"
        >
          Edit
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-6 py-3 rounded-full bg-danger text-white hover:bg-danger-hover"
        >
          Delete
        </button>

        {invoice.status !== "paid" && (
          <button
            onClick={() => onMarkPaid(invoice.id)}
            className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-light"
          >
            {invoice.status === "draft" ? "Send" : "Mark as Paid"}
          </button>
        )}
      </section>

      <Modal
        open={showDeleteModal}
        title="Confirm Deletion"
        body={`Are you sure you want to delete invoice #${invoice.id}? This action cannot be undone.`}
        onConfirm={() => onDelete(invoice.id)}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}
