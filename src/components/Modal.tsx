import PropTypes from 'prop-types';
import '../styles/Modal.css';
import logo from '../assets/images/codekey_unimayorBlack.png';

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={logo} alt="Warning icon" /> 
        <h2>Advertencia</h2>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
