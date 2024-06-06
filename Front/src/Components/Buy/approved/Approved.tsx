import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CheckCircle } from 'react-bootstrap-icons';
import './Approved.css'

function Approved() {
    return (
        <Container className="text-center my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <CheckCircle color="green" size={100} className="mb-4" />
                    <h1 className='h1A'>Compra Aprobada</h1>
                    <p className="lead mt-3">¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.</p>
                    <h4 className='h4A'>Podras ver el detalles clikeando aquí</h4>
                    <Button className='BA' variant="primary" href="/MisCompras">
                        Mis compras
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Approved;