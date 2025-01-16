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
    await axios
      .post(import.meta.env.VITE_APP_API_URL + "tempInvoiceDetails", invoice)
      .then((res) => {
        setProductInvoices([res.data, ...productInvoices]);
        setModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setModalOpen(false);
      });
  };
  return (
    <div className="">
      <ProductInvoiceForm onAdd={handleInvoiceAdd} />
      {productInvoices.length > 0 && isModalOpen && (
        <ProductsModal
          productInvoices={productInvoices}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
