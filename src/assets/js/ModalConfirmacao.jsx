import React from "react";

const ModalConfirmacao = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>⚠️ Confirmação</h3>
        <p>{message}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button onClick={onClose} className="CANCEL" style={btnCancelStyle}>
            Cancelar
          </button>
          <button onClick={onConfirm} style={btnConfirmStyle}>
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "25px",
  borderRadius: "12px",
  minWidth: "350px",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
};

const btnCancelStyle = {
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: "#aa3bff",
};

const btnConfirmStyle = {
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#d9534f",
  color: "white",
  fontWeight: "bold",
};

export default ModalConfirmacao;
