import FavouriteButton from "../FavouriteButton"
import SmallPriceGraph from "../../components/SmallPriceChart"
import { CoinRowTd, CoinRowTdDiv, CoinRowTr } from "./styled"
import { Link } from "react-router-dom"

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
  sevenDayChange?: number
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
  sevenDayChange,
  market_cap,
  volume,
  circ_supply,
  price_change_24h,
  price_change_24h_perc,
  roi,
  historical1D,
  graphScale,
}: TableCoinRowProps) => {
  return (
    <CoinRowTr>
      {favouriteBtn && (
        <CoinRowTd>
          <FavouriteButton coinId={id} size="1.25em" />
        </CoinRowTd>
      )}
      {market_cap_rank && <CoinRowTd>{market_cap_rank}</CoinRowTd>}
      <CoinRowTd>
        <Link to={`/coins/${id}`}>
          <img src={img} width="24px" alt="" className="me-2" />
          {`${name} ${symbol.toUpperCase()}`}
        </Link>
      </CoinRowTd>
      {amount && <CoinRowTd className="text-center">{amount.toLocaleString()}</CoinRowTd>}
      <CoinRowTd className="text-end">${price.toLocaleString()}</CoinRowTd>
      {value && <CoinRowTd className="text-center">${value.toLocaleString()}</CoinRowTd>}
      <CoinRowTd className="text-end">{price_change_24h_perc.toFixed(2)}%</CoinRowTd>
      {sevenDayChange && <CoinRowTd>{sevenDayChange.toLocaleString()}</CoinRowTd>}
      {market_cap && (
        <CoinRowTd>${parseInt(market_cap.toFixed(0)).toLocaleString()}</CoinRowTd>
      )}
      {volume && <CoinRowTd>${parseInt(volume.toFixed(0)).toLocaleString()}</CoinRowTd>}
      {circ_supply && (
        <CoinRowTd>
          {`${parseInt(circ_supply.toFixed(0)).toLocaleString()} ${symbol.toUpperCase()}`}
        </CoinRowTd>
      )}
      {roi && <CoinRowTd className="text-end">{`${roi.toFixed()}%`}</CoinRowTd>}
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
