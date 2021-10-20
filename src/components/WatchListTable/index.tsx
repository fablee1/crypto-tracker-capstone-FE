import { useState } from "react"
import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserFavourites } from "../../redux/slices/userSlice"
import { CardHeader } from "../Card/styled"
import TableCoinRow from "../TableCoinRow"
import { TableHeadCell } from "./styled"

const WatchListTable = () => {
  const userFavourites = useAppSelector(selectUserFavourites)
  const userCoins = useAppSelector(selectUserCoins)

  const [graphScale, setGraphScale] = useState(30)

  return (
    <Table className="text-white position-relative">
      <thead>
        <tr>
          <th className="p-0 border-0">
            <CardHeader>WatchList</CardHeader>
          </th>
          <TableHeadCell className="text-end">Price</TableHeadCell>
          <TableHeadCell className="text-center">24h</TableHeadCell>
          <TableHeadCell className="text-center">7d</TableHeadCell>
          <TableHeadCell
            className="text-center"
            onClick={() => setGraphScale(graphScale === 7 ? 30 : 7)}>
            {`Last ${graphScale} days`}
          </TableHeadCell>
        </tr>
      </thead>
      <tbody>
        {userFavourites.map((coinId) => {
          const coin = userCoins[coinId]

          return (
            <TableCoinRow
              id={coin.id}
              name={coin.name}
              img={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              historical1D={coin.historical1D}
              price7dAgo={coin.historical1D.at(-7).price}
              price_change_24h={coin.price_change_24h}
              price_change_24h_perc={coin.price_change_percentage_24h as number}
              graphScale={graphScale}
            />
          )
        })}
      </tbody>
    </Table>
  )
}

export default WatchListTable
