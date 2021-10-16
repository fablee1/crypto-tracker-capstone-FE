import { IAllCoinsData } from "."
import FavouriteButton from "../../components/FavouriteButton"
import SmallPriceGraph from "../../components/SmallPriceChart"

interface AllCoinsTableRowProps {
  data: IAllCoinsData
}

const AllCoinsTableRow = ({ data }: AllCoinsTableRowProps) => {
  return (
    <tr>
      <td>
        <FavouriteButton coinId={data.id} />
      </td>
      <td>{data.market_cap_rank}</td>
      <td>
        <img src={data.image} width="24px" alt="" className="me-2" />
        {`${data.name} ${data.symbol.toUpperCase()}`}
      </td>
      <td className="text-center">${data.current_price.toLocaleString()}</td>
      <td className="text-center">{data.price_change_percentage_24h}%</td>
      <td></td>
      <td>${data.market_cap.toFixed(0).toLocaleString()}</td>
      <td>${data.total_volume.toFixed(0).toLocaleString()}</td>
      <td>{`${data.circulating_supply.toLocaleString()} ${data.symbol.toUpperCase()}`}</td>
      <td style={{ maxWidth: "150px" }}>
        <SmallPriceGraph history={data.historical1D?.slice(-30)} />
      </td>
    </tr>
  )
}

export default AllCoinsTableRow
