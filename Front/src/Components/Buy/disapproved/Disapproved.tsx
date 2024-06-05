import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import './Disapproved.css';

function Disapproved() {
    return (
        <Container className="text-center my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <XCircle color="red" size={100} className="mb-4" />
                    <h1 className='h1D'>Compra Rechazada</h1>
                    <p className="lead mt-3">Lamentablemente, tu compra no pudo ser procesada.</p>
                    <h4 className='h4D'>Para más información, por favor, contáctanos.</h4>
                    <Button className='BD' variant="danger" href="/Help">
                        Contacto
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Disapproved;