import { useState } from "react"
import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserFavourites } from "../../redux/slices/userSlice"
import WatchListTableRow from "./watchListTableRow"

const WatchListTableFull = () => {
  const userFavourites = useAppSelector(selectUserFavourites)
  const userCoins = useAppSelector(selectUserCoins)

  const [graphScale, setGraphScale] = useState(30)

  return (
    <Table className="text-white">
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
            <WatchListTableRow
              marketCapRank={coin.market_cap_rank}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              history={coin.historical1D}
              priceChange24h={coin.price_change_24h as number}
              priceChange24hPercentage={
                coin.price_change_percentage_24h?.toFixed() as string
              }
              graphScale={graphScale}
              marketCap={coin.market_cap}
              volume={coin.total_volume as number}
              circulatingSupply={coin.circulating_supply as number}
            />
          )
        })}
      </tbody>
    </Table>
  )
}

export default WatchListTableFull
