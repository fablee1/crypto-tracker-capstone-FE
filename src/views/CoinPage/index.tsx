import { useEffect, useState } from "react"
import Col from "react-bootstrap/Col"
import Badge from "react-bootstrap/Badge"
import Card from "../../components/Card"
import ProgressBar from "react-bootstrap/ProgressBar"
import Row from "react-bootstrap/Row"
import { useParams } from "react-router"
import backend from "../../backend"
import TopNav from "../../components/TopNav"
import { ICryptoCurrency } from "../../typings/crypto"
import CoinPriceChart from "../../components/Charts/CoinPriceChart"
import SimpleLoader from "../../components/Loaders/SimpleLoader"
import { CoinPageContentWrapper } from "./styled"

const CoinPage = () => {
  const { id }: { id: string } = useParams()

  const [coinData, setCoinData] = useState<ICryptoCurrency | null>(null)
  const [coinHistory, setCoinHistory] = useState<
    { timestamp: number; price: number }[] | null
  >(null)

  useEffect(() => {
    const getCoinData = async () => {
      const { data } = await backend.get(`/crypto/${id}`)
      setCoinData(data)
    }
    getCoinData()

    const getCoinHistory = async () => {
      const { data } = await backend.get(`/crypto/${id}/history`)
      setCoinHistory(data.historical1D)
    }
    getCoinHistory()
  }, [])

  return (
    <>
      <CoinPageContentWrapper>
        <TopNav title={`${coinData?.name}`} addDataBtn={false} />
        {null ? (
          "ERROR"
        ) : (
          <Row className="gx-3 gy-3" style={{ color: "white" }}>
            <Col xs={12} sm={6}>
              <Card title="Price Chart" height="350px">
                {coinHistory ? <CoinPriceChart data={coinHistory} /> : <SimpleLoader />}
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card height="350px">
                <div className="d-flex align-items-center">
                  <img src={coinData?.image} alt={coinData?.name} width="50px" />
                  <h2 className="mb-0 ms-2 d-inline">
                    {coinData?.name} <strong>{coinData?.symbol.toUpperCase()}</strong>
                  </h2>
                  <Badge bg="secondary fs-6 ms-3">
                    Rank #{coinData?.market_cap_rank}
                  </Badge>
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </CoinPageContentWrapper>
    </>
  )
}

export default CoinPage
