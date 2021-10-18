import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserPortfolio } from "../../redux/slices/userSlice"
import TableCoinRow from "../TableCoinRow"
import BigNumber from "bignumber.js"

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

          const roi = new BigNumber(coin.current_price)
            .minus(c.averageBuyPrice)
            .dividedBy(c.averageBuyPrice)
            .multipliedBy(100)
            .toNumber()

          const value = new BigNumber(coin.current_price)
            .multipliedBy(c.amount)
            .toNumber()

          return (
            <TableCoinRow
              id={coin.id}
              img={coin.image}
              name={coin.name}
              value={value}
              symbol={coin.symbol}
              amount={c.amount}
              price={coin.current_price}
              roi={roi}
              price_change_24h={coin.price_change_24h as number}
              price_change_24h_perc={coin.price_change_percentage_24h as number}
            />
          )
        })}
      </tbody>
    </Table>
  )
}

export default PortfolioTable
