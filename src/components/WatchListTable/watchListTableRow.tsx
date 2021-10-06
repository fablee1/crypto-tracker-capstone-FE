import BigNumber from "bignumber.js"
import SmallPriceGraph from "./SmallPriceGraph"

interface WatchListTableRowProps {
  image: string
  symbol: string
  price: number
  history: { timestamp: number; price: number; _id: string }[]
  priceChange24h: number
  priceChange24hPercentage: string
}

const PortfolioTableRow = ({
  image,
  symbol,
  price,
  history,
  priceChange24h,
  priceChange24hPercentage,
}: WatchListTableRowProps) => {
  return (
    <tr>
      <td>
        <img src={image} width="24px" alt="" className="me-2" />
        {symbol.toUpperCase()}
      </td>
      <td className="text-center">{price}</td>
      <td className="text-center">
        <span className={priceChange24h < 0 ? "text-danger" : "text-success"}>
          {priceChange24h >= 0 && "+"}
          {priceChange24hPercentage}%
        </span>{" "}
        (
        <span className={priceChange24h < 0 ? "text-danger" : "text-success"}>
          {priceChange24h >= 0 && "+"}
          {priceChange24h.toPrecision(5)}
        </span>
        )
      </td>
      <td style={{ maxWidth: "150px" }}>
        <SmallPriceGraph history={history.slice(-7)} />
      </td>
    </tr>
  )
}

export default PortfolioTableRow
