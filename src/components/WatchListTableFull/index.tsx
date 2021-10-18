import { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserFavourites } from "../../redux/slices/userSlice"
import { ICryptoCurrency } from "../../typings/crypto"
import TableCoinRow from "../TableCoinRow"

const WatchListTableFull = () => {
  const userFavourites = useAppSelector(selectUserFavourites)
  const userCoins = useAppSelector(selectUserCoins)

  const [graphScale, setGraphScale] = useState(30)

  const [favCoins, setFavCoins] = useState<ICryptoCurrency[] | null>(null)

  useEffect(() => {
    const coins = userFavourites.map((id) => userCoins[id])
    coins.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
    setFavCoins(coins)
  }, [userFavourites, userCoins])

  return (
    <Table className="text-white position-relative">
      <thead>
        <tr>
          <th className="text-center">Rank</th>
          <th>Name</th>
          <th className="text-end">Price</th>
          <th className="text-center">24h %</th>
          <th className="text-center">7d %</th>
          <th className="text-end">Market Cap</th>
          <th className="text-end">Volume</th>
          <th className="text-end">Circulating Supply</th>
          <th
            className="text-end"
            onClick={() => setGraphScale(graphScale === 7 ? 30 : 7)}>
            Last 30 days
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {favCoins &&
          favCoins.map((coin) => {
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
                price7dAgo={coin.historical1D.at(-7).price}
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
