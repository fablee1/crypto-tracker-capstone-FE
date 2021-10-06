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
      <Row className="h-100 gx-3 gy-3">
        <Col xs={6}>
          <Card title="Holdings">
            <PortfolioTable />
          </Card>
        </Col>
        <Col xs={6}>
          <Card title="Profit / Loss">
            <></>
          </Card>
        </Col>
        <Col xs={6}>
          <Card title="Watchlist">
            <WatchListTable />
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
