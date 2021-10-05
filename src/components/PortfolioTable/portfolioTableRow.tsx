import BigNumber from "bignumber.js"

interface PortfolioTableRowProps {
  image: string
  symbol: string
  amount: number
  price: number
}

const PortfolioTableRow = ({ image, symbol, amount, price }: PortfolioTableRowProps) => {
  return (
    <tr>
      <td>
        <img src={image} width="24px" alt="" className="me-2" />
        {symbol.toUpperCase()}
      </td>
      <td>{amount}</td>
      <td>{price}</td>
      <td>{new BigNumber(amount).multipliedBy(price).toFixed(0)}</td>
      <td>no data</td>
      <td>no data</td>
    </tr>
  )
}

export default PortfolioTableRow
