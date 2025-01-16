import { useState } from "react";
import Record from "./common/Record";
import axios from "axios";

const ProductsModal = ({ onClose, productInvoices }) => {
  const [invoicesInModal, setInvoicesInModal] = useState(productInvoices);
  const [error, setErrors] = useState("");

  const handleClose = () => {
    onClose();
  };
  
  const handleChangeInvoice = (id, invoiceProduct) => {
    setInvoicesInModal([
      ...invoicesInModal.map((i) => (i._id === id ? { ...invoiceProduct } : i)),
    ]);
  };
  
  const handleRemoveInvoice = (id) => {
    setInvoicesInModal(invoicesInModal?.filter((i) => i._id !== id));
  };
  
  const handleSubmitInvoices = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_APP_API_URL + "invoice",
        invoicesInModal
      );
      setInvoicesInModal([]);
      onClose();
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div
      className="modal fade show shadow-lg"
      style={{ display: "block" }}
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="false"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Modal title</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <table className="table text-center">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Rate</th>
                  <th>Unit</th>
                  <th>Qty</th>
                  <th>Disc%</th>
                  <th>Net Amt.</th>
                  <th>Total Amt.</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoicesInModal?.map((item) => (
                  <Record
                    key={item._id}
                    invoice={item}
                    onChangeInvoice={handleChangeInvoice}
                    onRemoveInvoice={handleRemoveInvoice}
                  />
                  // <tr key={item.product_id}>
                  //   <td>{item.product_id.name}</td>
                  //   <td>{item.rate}</td>
                  //   <td>{item.unit}</td>
                  //   <td>{item.qty}</td>
                  //   <td>{item.disc_percentage}</td>
                  //   <td>{item.netAmount}</td>
                  //   <td>{item.totalAmount}</td>
                  //   <td>
                  //     <button className="btn btn-danger">Remove</button>
                  //   </td>
                  // </tr>
                ))}
                <tr>
                  <td>Master Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    &#8377;
                    {invoicesInModal.reduce(
                      (acc, item) => acc + parseInt(item.totalAmount),
                      0
                    )}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer py-0 ">
            {/* <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button> */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitInvoices}
            >
              Submit
            </button>
            {/* {error && <p className="text-danger">{error}</p>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsModal;
