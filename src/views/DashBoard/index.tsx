import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "../../components/Card"
import DashBoardTopBar from "../../components/DashBoardTopBar"
import TopNav from "../../components/TopNav"
import PortfolioTable from "../../components/PortfolioTable"
import WatchListTable from "../../components/WatchListTable"
import TotalValueChart from "../../components/Charts/TotalValueChart"
import { useEffect, useState } from "react"
import backend from "../../backend"
import ProfitLossChart from "../../components/Charts/ProfitLossChart"
import { useAppSelector } from "../../redux/hooks"
import { selectUserTransactions } from "../../redux/slices/userSlice"

const DashBoard = () => {
  const userTransactions = useAppSelector(selectUserTransactions)

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const getChartData = async () => {
      const { data } = await backend.get("/portfolio/value")
      setChartData(data)
    }
    getChartData()
  }, [userTransactions])

  return (
    <>
      <TopNav title="Your Dashboard" />
      <DashBoardTopBar />
      <Row className="gx-3 gy-3" style={{ height: "79%" }}>
        <Col xs={12} sm={6}>
          <Card height="350px" className="pt-2">
            <PortfolioTable />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card height="350px">
            <ProfitLossChart data={chartData} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card height="350px">
            <WatchListTable />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card height="350px">
            <TotalValueChart data={chartData} />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashBoard
