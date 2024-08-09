import "./ModalWithForm.css";
import closeButton from "../../assets./../assets/closeButton.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          className="modal__close"
          type="button"
        >
          <img src={closeButton} alt="close button" />
        </button>
        <form className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
