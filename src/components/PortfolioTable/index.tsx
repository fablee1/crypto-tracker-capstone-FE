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
          <th>Amount</th>
          <th>Price</th>
          <th>Value</th>
          <th>24h</th>
          <th>ROI</th>
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
            />
          )
        })}
      </tbody>
    </Table>
  )
}

export default PortfolioTable
