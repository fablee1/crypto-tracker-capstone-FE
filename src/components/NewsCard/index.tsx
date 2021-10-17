import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { NewsCardWrapper } from "./styled"

interface NewsCardProps {
  image: string
  published_on: number
  title: string
  url: string
  body: string
  categories: string
  source: {
    name: string
    img: string
  }
}

const NewsCard = ({
  image,
  published_on,
  title,
  url,
  body,
  categories,
  source,
}: NewsCardProps) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <NewsCardWrapper>
        <Card.Img
          variant="top"
          src={image}
          style={{ borderRadius: "15px", height: "150px", objectFit: "cover" }}
        />
        <Card.Body className="p-0 mt-2 text-white">
          <div className="d-flex align-items-center mt-2 mb-2 text-secondary">
            <img
              src={source.img}
              alt={source.name}
              width="40px"
              height="40px"
              className="me-2"
              style={{ borderRadius: "50%" }}
            />
            <div>{source.name}</div>
            <div className="ms-auto" style={{ textAlign: "justify" }}>
              {new Date(published_on).toLocaleTimeString()}
            </div>
          </div>
          <h5 className="mb-3">{title}</h5>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
      </NewsCardWrapper>
    </Col>
  )
}

export default NewsCard
