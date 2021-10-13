import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "../../components/Card"
import DashBoardTopBar from "../../components/DashBoardTopBar"
import DashBoardTopNav from "../../components/DashBoardTopNav"
import PortfolioTable from "../../components/PortfolioTable"
import WatchListTable from "../../components/WatchListTable"

const DashBoard = () => {
  return (
    <>
      <DashBoardTopNav />
      <DashBoardTopBar />
      <Row className="gx-3 gy-3" style={{ height: "79%" }}>
        <Col xs={12} sm={6}>
          <Card title="Holdings" height="350px">
            <PortfolioTable />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card title="Profit / Loss" height="350px">
            <></>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card title="Watchlist" height="350px">
            <WatchListTable />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card title="Portfolio value over time" height="350px">
            <></>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashBoard
