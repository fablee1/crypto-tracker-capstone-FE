import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import {
  selectUserCoins,
  selectUserPortfolio,
  selectUserTransactions,
} from "../../redux/slices/userSlice"
import Card from "../Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {
  StatsBlockTitle,
  StatsBlockValue,
  StatsBlockWrapper,
  StatsWrapper,
} from "./styled"
import NoCoinCover from "../../views/CoinPage/NoCoinCover"

const UserCoinStats = ({ id }: { id: string }) => {
  const userPortfolio = useAppSelector(selectUserPortfolio)
  const userCoins = useAppSelector(selectUserCoins)
  const userTransactions = useAppSelector(selectUserTransactions)

  const [statsData, setStatsData] = useState<{
    symbol: string
    amount: number
    averageBuyPrice: number
    coinValue: number
    invested: number
    roi: number
    firstTransDate: Date
    portfolioPercentage: number
    totalTransCount: number
  } | null>(null)

  useEffect(() => {
    const coinData = userCoins[id]
    const coinPortfolioData = userPortfolio.find((p) => p.coinId === id)

    if (coinData && coinPortfolioData) {
      const coinValue = coinPortfolioData.amount * coinData.current_price
      const invested = coinPortfolioData.amount * coinPortfolioData.averageBuyPrice
      const roi = ((coinValue - invested) / invested) * 100

      const userCoinTrans = userTransactions.filter((trans) => trans.coin === id)
      const firstTransDate = userCoinTrans.sort(
        (a, b) => a.date.valueOf() - b.date.valueOf()
      )[0].date

      const portfolioPercentage =
        (coinValue /
          userPortfolio
            .map((p) => p.amount * userCoins[p.coinId].current_price)
            .reduce((a, b) => a + b, 0)) *
        100

      const totalTransCount = userCoinTrans.length

      setStatsData({
        symbol: coinData.symbol,
        amount: coinPortfolioData.amount,
        averageBuyPrice: coinPortfolioData.averageBuyPrice,
        coinValue,
        portfolioPercentage,
        invested,
        roi,
        firstTransDate,
        totalTransCount,
      })
    }
  }, [id, userCoins, userPortfolio, userTransactions])

  return (
    <div className="mt-3">
      <Card title="Your Stats" height="305px">
        {statsData ? (
          <StatsWrapper>
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <StatsInfoBlock
                    title="Holding now"
                    value={`${statsData.amount.toLocaleString()} ${statsData.symbol.toUpperCase()}`}
                  />
                  <StatsInfoBlock
                    title="Coin Value"
                    value={`$${statsData.coinValue.toLocaleString()}`}
                  />
                  <StatsInfoBlock
                    title="Invested"
                    value={`$${statsData.invested.toLocaleString()}`}
                  />
                  <StatsInfoBlock
                    title="Average Buy Price"
                    value={`$${statsData.averageBuyPrice.toLocaleString()}`}
                  />
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <StatsInfoBlock title="ROI" value={`${statsData.roi.toFixed(2)}%`} />
                  <StatsInfoBlock
                    title="Total Transactions"
                    value={`${statsData.totalTransCount}`}
                  />
                  <StatsInfoBlock
                    title="First Buy"
                    value={`${new Date(statsData.firstTransDate).toLocaleDateString()}`}
                  />
                  <StatsInfoBlock
                    title="Portfolio %"
                    value={`${statsData.portfolioPercentage.toFixed(2)}%`}
                  />
                </Row>
              </Col>
            </Row>
          </StatsWrapper>
        ) : (
          <NoCoinCover />
        )}
      </Card>
    </div>
  )
}

export default UserCoinStats

interface StatsInfoBlockProps {
  title: string
  value: string
}

const StatsInfoBlock = ({ title, value }: StatsInfoBlockProps) => {
  return (
    <Col xs={6}>
      <StatsBlockWrapper>
        <StatsBlockTitle>{title}</StatsBlockTitle>
        <StatsBlockValue>{value}</StatsBlockValue>
      </StatsBlockWrapper>
    </Col>
  )
}
