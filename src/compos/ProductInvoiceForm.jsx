import { useEffect, useState } from "react";
import {
  calculateNetAmount,
  calculateTotalAmount,
} from "../utils/calculations";
import ProductsModal from "./productsModal";

const initialProductInvoice = {
  customer: "",
  product_id: "",
  rate: 0,
  unit: "INR",
  qty: 1,
  disc_percentage: 0,
  netAmount: 0,
  totalAmount: 0,
};

const ProductInvoiceForm = ({ onAdd }) => {
  const [productInvoice, setProductInvoice] = useState(initialProductInvoice);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // fetch products here
    setProducts([
      { product_id: 1, product_name: "product1", rate: 23, unit: "INR" },
      { product_id: 2, product_name: "product3", rate: 24, unit: "$" },
      { product_id: 3, product_name: "product2", rate: 25, unit: "$" },
      { product_id: 4, product_name: "product4", rate: 26, unit: "$" },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (errors) return;
    setModalOpen(true);
    console.log("productInvoice", productInvoice);
    onAdd(productInvoice);
  };

  console.log(errors);
  const validate = () => {
    const errs = {};
    if (productInvoice.customer === "") errs.customer = "customer is required";
    if (productInvoice.product_id === "")
      errs.product = "Please select a product";
    return Object.keys(errs).length === 0 ? null : errs;
  };

  useEffect(() => {
    setProductInvoice({
      ...productInvoice,
      netAmount: calculateNetAmount(
        productInvoice.rate,
        productInvoice.disc_percentage
      ),
      totalAmount: calculateTotalAmount(
        calculateNetAmount(productInvoice.rate, productInvoice.disc_percentage),
        productInvoice.qty
      ),
    });
  }, [productInvoice.rate, productInvoice.disc_percentage, productInvoice.qty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "product_id") {
      const choseProduct = products?.find((p) => p.product_id == value);
      setProductInvoice({
        ...productInvoice,
        [name]: value,
        rate: choseProduct.rate,
        unit: choseProduct.unit,
      });
    } else setProductInvoice({ ...productInvoice, [name]: value });
  };
  return (
    <>
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label htmlFor="customer" className="form-label">
            Customer:
          </label>
          <input
            type="text"
            name="customer"
            value={productInvoice.customer}
            onChange={handleChange}
            className="form-control"
            placeholder="Add customer name here"
          />
          {errors && errors.customer && (
            <div className="alert alert-danger mt-1 p-2">{errors.customer}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="product" className="form-label">
            Product:
          </label>
          <select
            name="product_id"
            id=""
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select a product</option>
            {products?.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>
          {errors && errors.product_id && (
            <div className="alert alert-danger mt-1 p-2">
              {errors.product.id}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="rate" className="form-label">
            Rate:
          </label>
          <input
            type="number"
            name="rate"
            value={productInvoice.rate}
            disabled
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="unit" className="form-label">
            Unit:
          </label>
          <input
            type="text"
            name="unit"
            value={productInvoice.unit}
            disabled
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="qty" className="form-label">
            Quantity:
          </label>
          <input
            type="text"
            name="qty"
            value={productInvoice.qty}
            onChange={handleChange}
            className="form-control"
            placeholder="Add Quantity"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="disc_percentage" className="form-label">
            Discount:
          </label>
          <input
            type="text"
            name="disc_percentage"
            value={productInvoice.disc_percentage}
            onChange={handleChange}
            className="form-control"
            placeholder="Add Discount Percentage here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="netAmount" className="form-label">
            Net Amount:
          </label>
          <input
            type="number"
            name="netAmount"
            value={productInvoice.netAmount}
            disabled
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">
            Total Amount
          </label>
          <input
            type="text"
            name="totalAmount"
            value={productInvoice.totalAmount}
            disabled
            className="form-control"
          />
        </div>
        {/* <button className="btn btn-primary"></button> */}
        <button
          // type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          // data-bs-target="#staticBackdrop"
        >
          Add
        </button>
      </form>
      {isModalOpen && <ProductsModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default ProductInvoiceForm;
