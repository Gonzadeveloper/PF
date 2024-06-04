import { useState } from 'react';
import { Accordion, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';

const Help = () => {
    const [activeAccordion, setActiveAccordion] = useState('');

    const handleAccordionToggle = (key: string) => {
        setActiveAccordion(key === activeAccordion ? '' : key);
    };

    return (
        <Container className="py-5">
            <Row>
                {/* Columna de preguntas frecuentes (FAQ) */}
                <Col lg={8}>
                    <h2>Preguntas Frecuentes (FAQ)</h2>
                    <Accordion activeKey={activeAccordion} onSelect={handleAccordionToggle}>
                        {/* Aquí van las preguntas frecuentes como acordeones */}
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>¿Cuáles son los métodos de pago aceptados?</Accordion.Header>
                            <Accordion.Body>
                                Aceptamos pagos con tarjeta de crédito, tarjeta de débito y PayPal.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>¿Cuál es el tiempo estimado de entrega?</Accordion.Header>
                            <Accordion.Body>
                                El tiempo de entrega varía según la ubicación y el tipo de envío seleccionado. Por lo general, los pedidos se entregan dentro de 3-5 días hábiles.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>¿Puedo devolver un producto si no estoy satisfecho?</Accordion.Header>
                            <Accordion.Body>
                                Sí, ofrecemos una política de devolución de 30 días. Puedes devolver cualquier producto no utilizado en su embalaje original para obtener un reembolso completo.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>¿Cómo puedo rastrear mi pedido?</Accordion.Header>
                            <Accordion.Body>
                                Una vez que tu pedido haya sido enviado, recibirás un correo electrónico con un número de seguimiento para rastrear tu envío en línea.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                {/* Columna de información de contacto */}
                <Col lg={4}>
                    <h2>Información de Contacto</h2>
                    <ListGroup>
                        <ListGroup.Item>Correo electrónico de Soporte: support@tudominio.com</ListGroup.Item>
                        <ListGroup.Item>Teléfono de Atención al Cliente: +1234567890</ListGroup.Item>
                        <ListGroup.Item>Horario de Atención: Lunes a Viernes de 9:00 a 18:00 (UTC-5)</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            {/* Enlaces útiles */}
            <Row className="mt-5">
                <Col>
                    <h2>Enlaces Útiles</h2>
                    <ListGroup>
                        <ListGroup.Item><a href="#">Guía del Usuario: Ver guía del usuario</a></ListGroup.Item>
                        <ListGroup.Item><a href="#">Foro de Soporte: Visitar el foro</a></ListGroup.Item>
                        <ListGroup.Item><a href="#">Política de Privacidad: Leer nuestra política de privacidad</a></ListGroup.Item>
                        <ListGroup.Item><a href="#">Términos y Condiciones: Consultar términos y condiciones</a></ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Help;
