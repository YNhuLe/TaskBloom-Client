import axios from "axios";
import "./GenerateSubTaskModal.scss";

const GenerateSubTaskModal = ({ taskId, onClose, onBreakdown, baseUrl }) => {
  // const onConfirm = async () => {
  //   try {
  //     // Replace the URL below with the actual Gemini API endpoint.
  //     const response = await axios.get(`http://gemini-backend/api/breakdown/${taskId}`);
  //     if (response.status === 200 && Array.isArray(response.data)) {
  //        onBreakdown(taskId, response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching subtasks:", error);
  //   }
  //   onClose();
  // };
//   console.log(`${baseUrl}/${taskId}/generate-subtask`);

  const generateSubtask = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/${taskId}/generate-subtask`
      );
      await onBreakdown();
      onClose();
      //   console.log(response.data);
    } catch (error) {
      console.error("Error in sending task to API", error);
    }
  };

  const onConfirm = () => {
    generateSubtask();
    // const mockSubTasks = ["Mock Subtask 1", "Mock Subtask 2", "Mock Subtask 3"];
    onBreakdown(taskId);
    onClose();
  };

  return (
    <div className="container-sticky">
      <div className="container modal">
        <div className="modal-overlay">
          <div className="modal confirm-modal">
            <div className="confirm-modal__content">
              <button className="confirm-modal__close-btn" onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="#13182C"
                  />
                </svg>
              </button>
              <div className="confirm-modal__header">
                <h2>Breakdown your task</h2>
              </div>
              <div className="confirm-modal__body">
                <p>
                  This will allow your AI powered co-pilot assistant to manage,
                  modify and re-arrange this task and its content. Is this okay?
                </p>
              </div>
              <div className="confirm-modal__footer">
                <button className="btn btn__cancel" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn btn__confirm" onClick={onConfirm}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateSubTaskModal;
