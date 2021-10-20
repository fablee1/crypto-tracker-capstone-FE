import FavouriteButton from "../FavouriteButton"
import SmallPriceGraph from "../../components/SmallPriceChart"
import { CoinRowName, CoinRowTd, CoinRowTr, CoinValuePercentage } from "./styled"
import { Link } from "react-router-dom"

const getSevenDayData = (price7dAgo: number, curr_price: number) => {
  const price_change = curr_price - price7dAgo
  const price_change_perc = (price_change / price7dAgo) * 100

  return { price_change, price_change_perc }
}

interface TableCoinRowProps {
  id: string
  symbol: string
  name: string
  price: number
  img: string
  price_change_24h_perc: number
  price_change_24h?: number
  favouriteBtn?: boolean
  amount?: number
  value?: number
  market_cap?: number
  volume?: number
  circ_supply?: number
  market_cap_rank?: number
  roi?: number
  historical1D?: {
    timestamp: number
    price: number
    _id: string
  }[]
  graphScale?: number
  price7dAgo?: number
}

const TableCoinRow = ({
  id,
  img,
  symbol,
  name,
  price,
  market_cap_rank,
  favouriteBtn,
  amount,
  value,
  market_cap,
  volume,
  circ_supply,
  price_change_24h,
  price_change_24h_perc,
  roi,
  historical1D,
  graphScale,
  price7dAgo,
}: TableCoinRowProps) => {
  return (
    <CoinRowTr>
      {favouriteBtn && (
        <CoinRowTd>
          <FavouriteButton coinId={id} size="1.25em" />
        </CoinRowTd>
      )}
      {market_cap_rank && (
        <CoinRowTd className={`${!favouriteBtn && "text-center"}`}>
          {market_cap_rank}
        </CoinRowTd>
      )}
      <CoinRowTd>
        <Link to={`/coins/${id}`} className="text-decoration-none">
          <img src={img} width="28px" alt="" className="me-2" />
          <CoinRowName>
            {`${name}`} <strong>{`${symbol.toUpperCase()}`}</strong>
          </CoinRowName>
        </Link>
      </CoinRowTd>
      {amount && <CoinRowTd className="text-end">{amount.toLocaleString()}</CoinRowTd>}
      <CoinRowTd className="text-end">${price.toLocaleString()}</CoinRowTd>
      {value && <CoinRowTd className="text-end">${value.toLocaleString()}</CoinRowTd>}
      <CoinRowTd className="text-center">
        <ColoredValueWithPercentage value={price_change_24h_perc} isPercentage /> (
        <ColoredValueWithPercentage value={price_change_24h as number} />)
      </CoinRowTd>
      {price7dAgo && (
        <CoinRowTd className="text-center">
          <ColoredValueWithPercentage
            value={getSevenDayData(price7dAgo as number, price).price_change_perc}
            isPercentage
          />{" "}
          (
          <ColoredValueWithPercentage
            value={getSevenDayData(price7dAgo as number, price).price_change}
          />
          )
        </CoinRowTd>
      )}
      {market_cap && (
        <CoinRowTd className="text-end">
          ${parseInt(market_cap.toFixed(0)).toLocaleString()}
        </CoinRowTd>
      )}
      {volume && (
        <CoinRowTd className="text-end">
          ${parseInt(volume.toFixed(0)).toLocaleString()}
        </CoinRowTd>
      )}
      {circ_supply && (
        <CoinRowTd className="text-end">
          {`${parseInt(circ_supply.toFixed(0)).toLocaleString()} ${symbol.toUpperCase()}`}
        </CoinRowTd>
      )}
      {roi && (
        <CoinRowTd className="text-end">
          <CoinValuePercentage value={roi}>{`${roi < 0 ? "" : "+"}${Math.round(
            roi
          ).toLocaleString()}%`}</CoinValuePercentage>
        </CoinRowTd>
      )}
      {historical1D && (
        <CoinRowTd style={{ maxWidth: "150px" }}>
          <SmallPriceGraph
            history={historical1D?.slice(graphScale ? -graphScale : -30)}
          />
        </CoinRowTd>
      )}
    </CoinRowTr>
  )
}

export default TableCoinRow

interface ColoredValueWithPercentageProps {
  value: number
  isPercentage?: boolean
}

const ColoredValueWithPercentage = ({
  value,
  isPercentage,
}: ColoredValueWithPercentageProps) => {
  return (
    <CoinValuePercentage value={value}>
      {isPercentage
        ? `${value < 0 ? "" : "+"}${value.toFixed()}%`
        : `$${
            value < 0
              ? parseFloat(value.toFixed(2)).toLocaleString().slice(1)
              : parseFloat(value.toFixed(2)).toLocaleString()
          }`}
    </CoinValuePercentage>
  )
}
