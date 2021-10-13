import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserPortfolio } from "../../redux/slices/userSlice"
import PortfolioTableRow from "./portfolioTableRow"

const PortfolioTable = () => {
  const userPortfolio = useAppSelector(selectUserPortfolio)
  const userCoins = useAppSelector(selectUserCoins)

  return (
    <Table className="text-white">
      <thead>
        <tr>
          <th></th>
          <th className="text-end">Amount</th>
          <th className="text-end">Price</th>
          <th className="text-end">Value</th>
          <th className="text-center">24h</th>
          <th className="text-end">ROI</th>
        </tr>
      </thead>
      <tbody>
        {userPortfolio.map((c) => {
          const coin = userCoins[c.coinId]

          return (
            <PortfolioTableRow
              image={coin.image}
              symbol={coin.symbol}
              amount={c.amount}
              price={coin.current_price}
              avgBuyPrice={c.averageBuyPrice}
              priceChange24h={coin.price_change_24h as number}
              priceChange24hPercentage={
                coin.price_change_percentage_24h?.toFixed() as string
              }
            />
          )
        })}
      </tbody>
    </Table>
  )
}

export default PortfolioTable
