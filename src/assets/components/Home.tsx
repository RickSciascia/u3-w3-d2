import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const endpoint = "https://api.spaceflightnewsapi.net/v4/articles";
import { type Articles } from "../types/interface";

const Home = function () {
  const [arrayOfArticles, setArrayOfArticles] = useState<Articles | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getArticles = function () {
    fetch(endpoint)
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("errore nella response" + r.status);
        }
      })
      .then((dataArticles) => {
        setArrayOfArticles(dataArticles);
        setLoading(false);
      })
      .catch((err) => {
        console.log("errore", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="dark"></Spinner>
        </div>
      ) : (
        <Container fluid>
          <title>Spaceflight News - Home</title>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <h1 className="text-center">NEWS IN EVIDENZA</h1>
              {arrayOfArticles?.results.map((art) => {
                return (
                  <Card key={art.id} className="mt-3">
                    <Card.Img variant="top" src={art.image_url} />
                    <Card.Body>
                      <Card.Title>{art.title}</Card.Title>
                      <Card.Text>
                        Di: {art.authors[0].name} Pubblicato il :{" "}
                        {art.published_at.slice(0, 10)}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(`/details/${art.id}`);
                        }}
                      >
                        Leggi
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
