import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "../../components/Card"

const DashBoard = () => {
  return (
    <>
      <Row className="h-100 gx-3 gy-3">
        <Col xs={6}>
          <Card title="Holdings">
            <></>
          </Card>
        </Col>
        <Col xs={6}>
          <Card title="Profit / Loss">
            <></>
          </Card>
        </Col>
        <Col xs={6}>
          <Card title="Watchlist">
            <></>
          </Card>
        </Col>
        <Col xs={6}>
          <Card title="Portfolio value over time">
            <></>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashBoard
