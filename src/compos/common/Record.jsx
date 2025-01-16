import { useEffect, useState } from "react";
import {
  calculateNetAmount,
  calculateTotalAmount,
} from "../../utils/calculations";

const Record = ({
  invoice: editedInvoice,
  onChangeInvoice,
  onRemoveInvoice,
}) => {
  const [products, setProducts] = useState([]);

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
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const choseProduct = products?.find(
      (p) => p._id == (name === "product_id" ? value : editedInvoice.product_id)
    );
    let rate = choseProduct.rate;
    let unit = choseProduct.unit;
    let disc_percentage =
      name === "disc_percentage" ? value : editedInvoice.disc_percentage;
    let qty = name === "qty" ? value : editedInvoice.qty;
    let updationO = {
      ...editedInvoice,
      product_id: choseProduct._id,
      rate: rate,
      unit: unit,
      qty,
      disc_percentage,
    };


    updationO.netAmount = calculateNetAmount(rate, disc_percentage);
    updationO.totalAmount = calculateTotalAmount(
      calculateNetAmount(rate, disc_percentage),
      qty
    );

    // setEditedInvoice(updationO);

    onChangeInvoice(editedInvoice._id, updationO);
  };

  // useEffect(() => {
  //   setEditedInvoice({
  //     ...editedInvoice,
  //   });
  // }, [editedInvoice.rate, editedInvoice.disc_percentage, editedInvoice.qty]);

  const handleRemove = (id) => {
    onRemoveInvoice(id);
  };

  return (
    <tr>
      <td>
        <select
          name="product_id"
          value={editedInvoice?.product_id?._id}
          className="form-select"
          onChange={handleInputChange}
        >
          {/* <option value="">Select a product</option> */}
          {products?.map((product) => (
            <option
              key={product._id}
              value={product._id}
              selected={product._id === editedInvoice.product_id}
            >
              {product.name}
            </option>
          ))}
        </select>
      </td>
      <td>{editedInvoice.rate}</td>
      <td>{editedInvoice.unit}</td>
      <td>
        <input
          type="number"
          className="form-control"
          name="qty"
          value={editedInvoice.qty}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="disc_percentage"
          className="form-control"
          value={editedInvoice.disc_percentage}
          onChange={handleInputChange}
        />
      </td>
      <td>{editedInvoice.netAmount}</td>
      <td>{editedInvoice.totalAmount}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleRemove(editedInvoice._id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default Record;
