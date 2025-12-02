import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
const endpoint = "https://api.spaceflightnewsapi.net/v4/articles";

const Home = function () {
  interface Articles {
    count: number;
    next: string | null;
    previous: string | null;
    results: Result[];
  }

  interface Result {
    id: number;
    title: string;
    authors: Author[];
    url: string;
    image_url: string;
    news_site: string;
    summary: string;
    published_at: string;
    updated_at: string;
    featured: boolean;
    launches: unknown[];
    events: unknown[];
  }

  interface Author {
    name: string;
    socials: null;
  }
  const [arrayOfArticles, setArrayOfArticles] = useState<Articles | null>(null);
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
        console.log(dataArticles);
        setArrayOfArticles(dataArticles);
      })
      .catch((err) => {
        console.log("errore", err);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <title>Spaceflight News - Home</title>
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h1 className="text-center">NEWS IN EVIDENZA</h1>
            {arrayOfArticles.results.map((art) => {
              return (
                <Card key={art.id} className="mt-3">
                  <Card.Img variant="top" src={art.image_url} />
                  <Card.Body>
                    <Card.Title>{art.title}</Card.Title>
                    <Card.Text>{art.summary}</Card.Text>
                    <Card.Text>
                      Di: {art.authors[0].name} Pubblicato il :{" "}
                      {art.published_at.slice(0, 10)}
                    </Card.Text>
                    <Button variant="primary">Leggi</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
