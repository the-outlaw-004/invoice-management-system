const ProductsModal = ({ onClose }) => {
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
            {" "}
            <p>
              s fugit aliquam hic fugiat dolores perspiciatis dolore odit
              voluptates. Unde vero deserunt explicabo quia facere magnam labore
              sint ea consequatur? Deserunt modi assumenda sunt!
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsModal;
