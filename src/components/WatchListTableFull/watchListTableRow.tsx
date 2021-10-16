import SmallPriceChart from "../SmallPriceChart"

interface WatchListTableRowProps {
  image: string
  symbol: string
  price: number
  history: { timestamp: number; price: number; _id: string }[]
  priceChange24h: number
  priceChange24hPercentage: string
  graphScale: number
  marketCapRank: number
  marketCap: number
  volume: number
  circulatingSupply: number
}

const WatchListTableRow = ({
  image,
  marketCapRank,
  marketCap,
  symbol,
  price,
  history,
  priceChange24h,
  priceChange24hPercentage,
  graphScale,
  volume,
  circulatingSupply,
}: WatchListTableRowProps) => {
  return (
    <tr>
      <td>{`#${marketCapRank}`}</td>
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
      <td>No Data</td>
      <td>{marketCap}</td>
      <td>{volume}</td>
      <td>{circulatingSupply}</td>
      <td style={{ maxWidth: "150px" }}>
        <SmallPriceChart history={history?.slice(-graphScale)} />
      </td>
    </tr>
  )
}

export default WatchListTableRow
