import { useEffect, useState } from "react";
import ProductInvoiceForm from "./compos/ProductInvoiceForm";
import ProductsModal from "./compos/ProductsModal";
import axios from "axios";

function App() {
  const [productInvoices, setProductInvoices] = useState([]);
  const [isModalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    async function fetchProductInvoices() {
      await fetch(import.meta.env.VITE_APP_API_URL + "tempInvoiceDetails")
        .then((res) => res.json())
        .then((res) => {
          setProductInvoices(res);
        })
        .catch((err) => console.log(err));
    }
    fetchProductInvoices();
  }, []);

  const handleInvoiceAdd = async (invoice) => {
    console.log("invoice", invoice);
    const originalInvoices = [...productInvoices];
    setProductInvoices([invoice, ...productInvoices]);
    setModalOpen(true);
    try {
      await axios.post(
        import.meta.env.VITE_APP_API_URL + "tempInvoiceDetails",
        invoice
      );
    } catch (error) {
      console.log(error);
      setProductInvoices(originalInvoices);
      setModalOpen(false);
    }
  };
  return (
    <div className="">
      <ProductInvoiceForm onAdd={handleInvoiceAdd} />
      {isModalOpen && (
        <ProductsModal
          productInvoices={productInvoices}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
