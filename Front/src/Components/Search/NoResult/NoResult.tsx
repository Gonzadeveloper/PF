import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NoResultsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>No hay resultados</Modal.Title>
      </Modal.Header>
      <Modal.Body>No se encontraron productos que coincidan con los filtros aplicados.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoResultsModal;