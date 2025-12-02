import { Container, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col sm={12} md={6}>
          <h1>Spiacente</h1>
          <h3>
            Non siamo riusciti a trovare il contenuto che stavi cercando :({" "}
          </h3>
          <Button
            variant="info"
            onClick={() => {
              navigate("/");
            }}
          >
            TORNA ALLA HOME
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
