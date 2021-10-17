import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

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
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default NewsCard
