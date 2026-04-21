import { create } from "zustand";
import { persist } from "zustand/middleware";
import { invoiceData } from "../data/data";
import type { Invoice, Status } from "../types/types";

type InvoiceStore = {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  saveInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
};

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      invoices: invoiceData,

      addInvoice: (invoice: Invoice) =>
        set((state) => ({
          invoices: [invoice, ...state.invoices],
        })),

      updateInvoice: (invoice: Invoice) =>
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.id === invoice.id ? invoice : inv,
          ),
        })),

      saveInvoice: (invoice: Invoice) =>
        set((state) => {
          const exists = state.invoices.find((inv) => inv.id === invoice.id);

          return {
            invoices: exists
              ? state.invoices.map((inv) =>
                  inv.id === invoice.id ? invoice : inv,
                )
              : [invoice, ...state.invoices],
          };
        }),

      deleteInvoice: (id) =>
        set((state) => ({
          invoices: state.invoices.filter((inv) => inv.id !== id),
        })),
      markAsPaid: (id) =>
        set((state) => {
          console.log("markAsPaid called with id:", id);
          console.log(
            "current invoices:",
            state.invoices.map((i) => ({ id: i.id, status: i.status })),
          );

          const updated = state.invoices.map((inv) =>
            inv.id === id ? { ...inv, status: "paid" as Status } : inv,
          );

          console.log(
            "updated invoices:",
            updated.map((i) => ({ id: i.id, status: i.status })),
          );
          return { invoices: updated };
        }),
    }),
    {
      name: "invoice-storage",
    },
  ),
);
