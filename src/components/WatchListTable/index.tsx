import { useState } from "react"
import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserFavourites } from "../../redux/slices/userSlice"
import TableCoinRow from "../TableCoinRow"

const WatchListTable = () => {
  const userFavourites = useAppSelector(selectUserFavourites)
  const userCoins = useAppSelector(selectUserCoins)

  const [graphScale, setGraphScale] = useState(30)

  return (
    <Table className="text-white">
      <thead>
        <tr>
          <th></th>
          <th className="text-center">Price</th>
          <th className="text-center">24h</th>
          <th
            className="text-center"
            onClick={() => setGraphScale(graphScale === 7 ? 30 : 7)}>
            {graphScale}
          </th>
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
