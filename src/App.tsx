import InvoiceList from "./components/InvoiceList";
import Navbar from "./components/Navbar";
import { invoiceData } from "./data/data";

function App() {
  const handleCreate = () => {
    console.log("create invoice");
  };

  const handleView = (invoice: any) => {
    console.log("view invoice", invoice);
  };
  return (
    <>
      <Navbar />
      <main>
        <InvoiceList
          invoices={invoiceData}
          onCreate={handleCreate}
          onView={handleView}
        />
      </main>
    </>
  );
}

export default App;
