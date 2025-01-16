import { useEffect, useState } from "react";
import {
  calculateNetAmount,
  calculateTotalAmount,
} from "../utils/calculations";
// import ProductsModal from "./productsModal";

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
  // const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      await fetch(import.meta.env.VITE_APP_API_URL + "products")
        .then((res) => res.json())
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => console.log(err));
    }
    fetchProducts();

    // fetch products here
    // setProducts([
    //   { product_id: 1, product_name: "product1", rate: 23, unit: "INR" },
    //   { product_id: 2, product_name: "product3", rate: 24, unit: "$" },
    //   { product_id: 3, product_name: "product2", rate: 25, unit: "$" },
    //   { product_id: 4, product_name: "product4", rate: 26, unit: "$" },
    // ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (errors && Object.keys(errors).length > 0) {
      console.log(errors);
      return;
    }
    // setModalOpen(true);

    onAdd(productInvoice);
    setProductInvoice(initialProductInvoice)

  };

  const validate = () => {
    const errs = {};
    if (productInvoice.customer === "")
      errs.customer = "Customer Name is required";
    if (productInvoice.product_id === "")
      errs.product_id = "Please select a product";
    if (productInvoice.qty <= 0) errs.qty = "Please add quantity";
    if (productInvoice.disc_percentage === "")
      errs.disc_percentage = "Please add discount percentage";
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

  const validateProperty = (name, value) => {
    if (name === "customer") {
      if (value === "") {
        return "Customer name is required";
      } else if (value.length < 3)
        return "Customer name should be at least of 3 characters";
    }
    if (name === "product_id") {
      if (value === "") {
        return "please select a Product";
      }
    }
    if (name === "qty") {
      if (value === "" || value == 0) {
        return "At least 1 product quantity required";
      }
    }
    if (name === "disc_percentage") {
      if (value === "") {
        return "Please add discount percentage here (0-100)";
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    const errMessage = validateProperty(name, value);
    if (errMessage) {
      newErrors[name] = errMessage;
    } else delete newErrors[name];
    setErrors(newErrors);
    if (name === "product_id") {
      const choseProduct = products?.find((p) => p._id == value);
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
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          {errors && errors.product_id && (
            <div className="alert alert-danger mt-1 p-2">
              {errors.product_id}
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
          {errors && errors.qty && (
            <div className="alert alert-danger mt-1 p-2">{errors.qty}</div>
          )}
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
          {errors && errors.disc_percentage && (
            <div className="alert alert-danger mt-1 p-2">
              {errors.disc_percentage}
            </div>
          )}
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
      {/* {isModalOpen && <ProductsModal onClose={() => setModalOpen(false)} />} */}
    </>
  );
};

export default ProductInvoiceForm;
