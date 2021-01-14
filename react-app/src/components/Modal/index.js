import ReactDom from "react-dom";
import "./Modal.css";

const Modal = ({ open, children, onClose }) => {
	if (!open) return null;

	return ReactDom.createPortal(
		<div className="modal-blur">
			<div className="modal-content">
				<div className="modal-button-holder">
					<button className="modal-close-button" onClick={onClose}>
						<i class="fas fa-window-close"></i>
					</button>
				</div>
				{children}
			</div>
		</div>,
		document.getElementById("modal")
	);
};

export default Modal;
