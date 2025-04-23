import "./CongratsModal.scss";

const CongratsModal = ({ onClose }) => {
  const handleClose = () => {
    onClose(); 
    window.dispatchEvent(new Event("congratsModalClose"));
  };

  return (
    <div className="container-sticky">
      <div className="container modal">
        <div className="modal-overlay">
          <div className="modal confirm-modal">
            <div className="confirm-modal__content">
              <button
                className="confirm-modal__close-btn"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12Z"
                    fill="#13182C"
                  />
                </svg>
              </button>
              <div className="confirm-modal__header">
                <h2>Congrats!</h2>
              </div>
              <div className="confirm-modal__body">
                <p>You're done with all of today's tasks!</p>
              </div>
              <div className="confirm-modal__footer">
                <button className="btn btn__confirm" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratsModal;