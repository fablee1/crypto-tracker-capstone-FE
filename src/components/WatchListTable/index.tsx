import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserFavourites } from "../../redux/slices/userSlice"
import WatchListTableRow from "./watchListTableRow"

const WatchListTable = () => {
  const userFavourites = useAppSelector(selectUserFavourites)
  const userCoins = useAppSelector(selectUserCoins)

  return (
    <Table className="text-white">
      <thead>
        <tr>
          <th></th>
          <th className="text-center">Price</th>
          <th className="text-center">24h</th>
          <th className="text-center">7d</th>
        </tr>
      </thead>
      <tbody>
        {userFavourites.map((coinId) => {
          const coin = userCoins[coinId]

          return (
            <WatchListTableRow
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              history={coin.historical1D}
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

export default WatchListTable
