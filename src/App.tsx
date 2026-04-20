import { useState } from "react";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetail from "./components/InvoiceDetail";
import { invoiceData } from "./data/data";
import type { Invoice } from "./types/types";
import Navbar from "./components/Navbar";

function App() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleCreate = () => {
    console.log("create invoice");
  };

  const handleView = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleBack = () => {
    setSelectedInvoice(null);
  };

  return (
    <>
      <Navbar />
      <main>
        {selectedInvoice ? (
          <InvoiceDetail
            invoice={selectedInvoice}
            onBack={handleBack}
            onEdit={() => console.log("edit")}
            onDelete={() => console.log("delete")}
            onMarkPaid={() => console.log("mark paid")}
          />
        ) : (
          <InvoiceList
            invoices={invoiceData}
            onCreate={handleCreate}
            onView={handleView}
          />
        )}
      </main>
    </>
  );
}

export default App;
