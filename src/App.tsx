import { useEffect, useState } from "react";
import { useInvoiceStore } from "./store/invoiceStore";
import type { Invoice } from "./types/types";
import Navbar from "./components/Navbar";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetail from "./components/InvoiceDetail";
import InvoiceForm from "./components/InvoiceForm";

function App() {
  const { invoices, deleteInvoice, markAsPaid, saveInvoice } =
    useInvoiceStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const selectedInvoice = invoices.find((inv) => inv.id === selectedId) ?? null;

  const handleCreate = () => {
    setEditingInvoice(null);
    setIsFormOpen(true);
  };
  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };
  const handleView = (invoice: Invoice) => {
    setSelectedId(invoice.id);
  };
  const handleBack = () => {
    setSelectedId(null);
  };

  const handleSave = (data: Invoice) => {
    saveInvoice(data); // handles both create and update
    setIsFormOpen(false);
    setEditingInvoice(null);
    setSelectedId(data.id);
  };

  const handleDelete = (id: string) => {
    deleteInvoice(id);
    setSelectedId(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingInvoice(null);
  };

  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);

  return (
    <>
      <Navbar />
      <main>
        {selectedInvoice && (
          <InvoiceDetail
            invoice={selectedInvoice}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMarkPaid={markAsPaid}
          />
        )}
        {!selectedInvoice && (
          <InvoiceList
            invoices={invoices}
            onCreate={handleCreate}
            onView={handleView}
          />
        )}
        {/* {isFormOpen && ( */}
        <InvoiceForm
          open={isFormOpen}
          onBack={handleCloseForm}
          initial={editingInvoice ?? undefined}
          onSave={handleSave}
          onCancel={handleCloseForm}
        />
        {/* )} */}
      </main>
    </>
  );
}

export default App;
