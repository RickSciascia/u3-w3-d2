import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { type Result } from "../types/interface";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Details = function () {
  const [artDetails, setArtDetails] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const endpoint = "https://api.spaceflightnewsapi.net/v4/articles/";
  const params = useParams();
  const navigate = useNavigate();
  const getArtDetails = function () {
    fetch(endpoint + params.id)
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Errore nella response" + r.status);
        }
      })
      .then((data) => {
        setArtDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Errore", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getArtDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container>
        <h1 className="text-center">Dettagli del articolo</h1>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={6}>
            {loading ? (
              <div className="text-center mt-3">
                <Spinner animation="border" variant="dark"></Spinner>
              </div>
            ) : (
              <Card>
                <Card.Img variant="top" src={artDetails?.image_url} />
                <Card.Body>
                  <Card.Title>{artDetails?.title}</Card.Title>
                  <Card.Subtitle>
                    Articolo di {artDetails?.authors[0].name} - per{" "}
                    {artDetails?.news_site}
                  </Card.Subtitle>
                  <Card.Text>
                    Pubblicato il {artDetails?.published_at.slice(0, 10)}{" "}
                  </Card.Text>
                  <Card.Text>{artDetails?.summary}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Torna alla Home
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Details;
