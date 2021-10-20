import Badge from "react-bootstrap/Badge"
import ProgressBar from "react-bootstrap/ProgressBar"
import { useState, useEffect } from "react"
import { ICryptoCurrency } from "../../typings/crypto"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import backend from "../../backend"
import {
  GeneralInfoBlockTitle,
  GeneralInfoBlockValue,
  GeneralInfoWrapper,
  InfoBlockWrapper,
} from "./styled"
import FavouriteButton from "../FavouriteButton"
import SimpleLoader from "../Loaders/SimpleLoader"

const CoinGeneralInfo = ({ id }: { id: string }) => {
  const [coinData, setCoinData] = useState<ICryptoCurrency | null>(null)

  useEffect(() => {
    const getCoinData = async () => {
      const { data } = await backend.get(`/crypto/${id}`)
      setCoinData(data)
    }
    getCoinData()
  }, [id])

  return (
    <>
      {coinData ? (
        <GeneralInfoWrapper>
          <div className="d-flex align-items-center">
            <img src={coinData?.image} alt={coinData?.name} width="50px" />
            <h2 className="mb-0 ms-2 d-inline">
              {coinData?.name} <strong>{coinData?.symbol.toUpperCase()}</strong>
            </h2>
            <Badge bg="secondary fs-6 ms-3">Rank #{coinData?.market_cap_rank}</Badge>

            <div className="ms-auto">
              <FavouriteButton coinId={id} size="2em" />
            </div>
          </div>
          <div className="d-flex align-items-center w-50">
            {`$${coinData?.low_24h?.toLocaleString()}`}
            <ProgressBar
              now={
                (((coinData?.current_price as number) - (coinData?.low_24h as number)) /
                  ((coinData?.high_24h as number) - (coinData?.low_24h as number))) *
                100
              }
              className="my-4 mx-2"
              bsPrefix="min-max-price"
            />
            {`$${coinData?.high_24h?.toLocaleString()}`}
          </div>
          <Row>
            <SingleInfoBlock
              title="Price"
              value={`$${coinData?.current_price?.toLocaleString()}`}
              valueBig
              borderR
            />
            <SingleInfoBlock
              title="Market Cap"
              value={`$${coinData?.market_cap.toLocaleString()}`}
              borderR
            />
            <SingleInfoBlock
              title="Max Supply"
              value={`${coinData?.max_supply?.toLocaleString()} BTC`}
            />
            <SingleInfoBlock
              title="Volume"
              value={`$${coinData?.total_volume?.toLocaleString()}`}
              borderR
            />
            <SingleInfoBlock
              title="Fully Diluted Market Cap"
              value={`$${coinData?.fully_diluted_valuation?.toLocaleString()}`}
              borderR
            />
            <SingleInfoBlock
              title="Circulating Supply"
              value={`${coinData?.circulating_supply?.toLocaleString()} BTC`}
            />
          </Row>
        </GeneralInfoWrapper>
      ) : (
        <SimpleLoader />
      )}
    </>
  )
}

export default CoinGeneralInfo

interface SingleInfoBlockProps {
  title?: string
  value: string
  valueBig?: boolean
  borderL?: boolean
  borderR?: boolean
}

const SingleInfoBlock = ({
  title,
  value,
  valueBig,
  borderL,
  borderR,
}: SingleInfoBlockProps) => {
  return (
    <Col xs={6} md={4}>
      <InfoBlockWrapper borderL={borderL} borderR={borderR}>
        {title && <GeneralInfoBlockTitle>{title}</GeneralInfoBlockTitle>}
        <GeneralInfoBlockValue valueBig={valueBig}>
          {!value.includes("undefined") ? value : "No Data"}
        </GeneralInfoBlockValue>
      </InfoBlockWrapper>
    </Col>
  )
}
