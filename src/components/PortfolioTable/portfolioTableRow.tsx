import BigNumber from "bignumber.js"

interface PortfolioTableRowProps {
  image: string
  symbol: string
  amount: number
  price: number
  avgBuyPrice: number
  priceChange24h: number
  priceChange24hPercentage: string
}

const PortfolioTableRow = ({
  image,
  symbol,
  amount,
  price,
  avgBuyPrice,
  priceChange24h,
  priceChange24hPercentage,
}: PortfolioTableRowProps) => {
  const roi = new BigNumber(price)
    .minus(avgBuyPrice)
    .dividedBy(avgBuyPrice)
    .multipliedBy(100)
    .toFixed(0)
  return (
    <tr>
      <td>
        <img src={image} width="24px" alt="" className="me-2" />
        {symbol.toUpperCase()}
      </td>
      <td className="text-end">{amount}</td>
      <td className="text-end">{price}</td>
      <td className="text-end">{new BigNumber(amount).multipliedBy(price).toFixed(0)}</td>
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
      <td
        className={`text-end ${
          parseFloat(roi) < 0 ? "text-danger" : "text-success"
        }`}>{`${roi}%`}</td>
    </tr>
  )
}

export default PortfolioTableRow
