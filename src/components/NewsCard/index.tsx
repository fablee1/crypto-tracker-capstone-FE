import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { NewsCardWrapper } from "./styled"
import LinesEllipsis from "react-lines-ellipsis"
import { Link } from "react-router-dom"

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
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <NewsCardWrapper>
        <Link to={{ pathname: url }} target="_blank" className="text-decoration-none">
          <Card.Img
            variant="top"
            src={image}
            style={{ borderRadius: "15px", height: "175px", objectFit: "cover" }}
          />
          <Card.Body className="p-0 mt-2 text-white">
            <div className="d-flex align-items-center my-3 text-secondary">
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
            <h5 className="mb-3">
              <LinesEllipsis text={title} maxLine={2} ellipsis="..." />
            </h5>
            <Card.Text>
              <LinesEllipsis text={body} maxLine={3} ellipsis="..." />
            </Card.Text>
          </Card.Body>
        </Link>
      </NewsCardWrapper>
    </Col>
  )
}

export default NewsCard
