import { useState } from "react"
import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserFavourites } from "../../redux/slices/userSlice"
import TableCoinRow from "../TableCoinRow"

const WatchListTableFull = () => {
  const userFavourites = useAppSelector(selectUserFavourites)
  const userCoins = useAppSelector(selectUserCoins)

  const [graphScale, setGraphScale] = useState(30)

  return (
    <Table className="text-white position-relative">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h %</th>
          <th>7d %</th>
          <th>Market Cap</th>
          <th>Volume</th>
          <th>Circulating Supply</th>
          <th>Last 30 days</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userFavourites.map((coinId) => {
          const coin = userCoins[coinId]

          return (
            <TableCoinRow
              id={coin.id}
              market_cap_rank={coin.market_cap_rank}
              img={coin.image}
              name={coin.name}
              symbol={coin.symbol}
              price={coin.current_price}
              historical1D={coin.historical1D}
              price_change_24h={coin.price_change_24h as number}
              price_change_24h_perc={coin.price_change_percentage_24h as number}
              graphScale={graphScale}
              sevenDayChange={0.1}
              market_cap={coin.market_cap}
              volume={coin.total_volume as number}
              circ_supply={coin.circulating_supply as number}
            />
          )
        })}
      </tbody>
    </Table>
  )
}

export default WatchListTableFull
