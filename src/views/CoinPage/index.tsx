import { useEffect, useState } from "react"
import Col from "react-bootstrap/Col"
import Card from "../../components/Card"
import Row from "react-bootstrap/Row"
import { useParams } from "react-router"
import backend from "../../backend"
import TopNav from "../../components/TopNav"
import CoinPriceChart from "../../components/Charts/CoinPriceChart"
import SimpleLoader from "../../components/Loaders/SimpleLoader"
import { CoinPageContentWrapper } from "./styled"
import CoinGeneralInfo from "../../components/CoinGeneralInfo"
import UserCoinStats from "../../components/UserCoinStats"
import UserCoinTransactions from "../../components/UserCoinTransactions"
import UserCoinTransactionsDetails from "../../components/UserCoinTransactionsDetails"
import { useAppSelector } from "../../redux/hooks"
import { selectUserPortfolio } from "../../redux/slices/userSlice"

const CoinPage = () => {
  const { id }: { id: string } = useParams()
  const userPortfolio = useAppSelector(selectUserPortfolio)

  const [selectedTrans, setSelectedTrans] = useState<string | null>(null)

  const [coinInPortfolio, setCoinInPortfolio] = useState(false)

  const [coinHistory, setCoinHistory] = useState<
    { timestamp: number; price: number }[] | null
  >(null)

  useEffect(() => {
    setCoinInPortfolio(
      userPortfolio.findIndex((p) => p.coinId === id) === -1 ? false : true
    )
  }, [id, userPortfolio])

  useEffect(() => {
    const getCoinHistory = async () => {
      const { data } = await backend.get(`/crypto/${id}/history`)
      setCoinHistory(data.historical1D)
    }
    getCoinHistory()
  }, [id])

  return (
    <>
      <CoinPageContentWrapper>
        <TopNav title="Coin Page" addDataBtn={false} />
        <Row className="gx-3 gy-3" style={{ color: "white" }}>
          <Col xs={12} sm={6}>
            <Card height="350px">
              {coinHistory ? <CoinPriceChart data={coinHistory} /> : <SimpleLoader />}
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card height="350px">
              <CoinGeneralInfo id={id} />
            </Card>
          </Col>
        </Row>
        <UserCoinStats id={id} />
        <Row>
          <Col xs={12} sm={6}>
            <UserCoinTransactions
              coinId={id}
              selectTrans={setSelectedTrans}
              coinInPortfolio={coinInPortfolio}
            />
          </Col>
          <Col xs={12} sm={6}>
            <UserCoinTransactionsDetails
              transId={selectedTrans}
              coinInPortfolio={coinInPortfolio}
            />
          </Col>
        </Row>
      </CoinPageContentWrapper>
    </>
  )
}

export default CoinPage
