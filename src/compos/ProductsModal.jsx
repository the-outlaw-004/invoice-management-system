const ProductsModal = ({ onClose, productInvoices }) => {
  console.log("form modal", productInvoices);
  const handleClose = () => {
    onClose();
  };
  return (
    <div
      className="modal fade show"
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
            <table className="table">
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
                {productInvoices?.map((item) => (
                  <tr key={item.product_id}>
                    <td>{item.product_id.name}</td>
                    <td>{item.rate}</td>
                    <td>{item.unit}</td>
                    <td>{item.qty}</td>
                    <td>{item.disc_percentage}</td>
                    <td>{item.netAmount}</td>
                    <td>{item.totalAmount}</td>
                    <td>
                      <button className="btn btn-danger">Remove</button>
                    </td>
                  </tr>
                ))}
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
            <button type="button" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsModal;
