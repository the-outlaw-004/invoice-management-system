import { useEffect, useState } from "react";
import ProductInvoiceForm from "./compos/ProductInvoiceForm";

function App() {
  const [productInvoices, setProductInvoices] = useState([]);
  console.log(productInvoices);

  useEffect(() => {
    // setProductInvoices
  }, []);

  const handleInvoiceAdd = (invoice) => {
    console.log(invoice);
    setProductInvoices([invoice, ...productInvoices]);
  };
  return (
    <div className="">
      <ProductInvoiceForm onAdd={handleInvoiceAdd} />
    </div>
  );
}

export default App;
