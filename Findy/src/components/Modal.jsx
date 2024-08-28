// components/Modal.js
import CreatePostForm from "./CreatePost"; // Importa el formulario de creación

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <button className="absolute top-2 right-2 text-black" onClick={onClose}>
          &times;
        </button>
        <CreatePostForm />
      </div>
    </div>
  );
};

export default Modal;
