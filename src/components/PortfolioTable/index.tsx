import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserPortfolio } from "../../redux/slices/userSlice"
import TableCoinRow from "../TableCoinRow"
import BigNumber from "bignumber.js"
import { CardHeader } from "../Card/styled"
import { TableHeadCell } from "./styled"

const PortfolioTable = () => {
  const userPortfolio = useAppSelector(selectUserPortfolio)
  const userCoins = useAppSelector(selectUserCoins)

  return (
    <Table className="text-white">
      <thead>
        <tr>
          <th className="p-0 border-0">
            <CardHeader>Holdings</CardHeader>
          </th>
          <TableHeadCell className="text-end">Amount</TableHeadCell>
          <TableHeadCell className="text-end">Price</TableHeadCell>
          <TableHeadCell className="text-end">Value</TableHeadCell>
          <TableHeadCell className="text-center">24h</TableHeadCell>
          <TableHeadCell className="text-center">7d</TableHeadCell>

          <TableHeadCell className="text-end">ROI</TableHeadCell>
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
              price7dAgo={coin.historical1D.at(-7).price}
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
