import { useState } from "react";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetail from "./components/InvoiceDetail";
import { invoiceData } from "./data/data";
import type { Invoice } from "./types/types";
import Navbar from "./components/Navbar";
import InvoiceForm from "./components/InvoiceForm";

function App() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>(invoiceData);

  const handleCreate = () => {
    setEditingInvoice(null);
    setIsFormOpen(true);
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };

  const handleView = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleBack = () => {
    setSelectedInvoice(null);
  };

  // Save
  const handleSave = (data: Invoice) => {
    if (editingInvoice) {
      // update
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === data.id ? data : inv)),
      );
    } else {
      // create
      setInvoices((prev) => [data, ...prev]);
    }

    setIsFormOpen(false);
    setEditingInvoice(null);
    setSelectedInvoice(data);
  };

  // delete
  const handleDelete = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    setSelectedInvoice(null);
  };

  // mark as paid
  const handleMarkPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv)),
    );
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingInvoice(null);
  };

  return (
    <>
      <Navbar />
      <main>
        {!isFormOpen && selectedInvoice && (
          <InvoiceDetail
            invoice={selectedInvoice}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMarkPaid={handleMarkPaid}
          />
        )}
        {!isFormOpen && !selectedInvoice && (
          <InvoiceList
            invoices={invoices}
            onCreate={handleCreate}
            onView={handleView}
          />
        )}

        {isFormOpen && (
          <InvoiceForm
            onBack={handleCloseForm}
            initial={editingInvoice || undefined}
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
      </main>
    </>
  );
}

export default App;
