import Card from "../../components/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { ReactComponent as Binoculars } from "../../img/binoculars.svg"
import WatchListTableFull from "../../components/WatchListTableFull"
import {
  InfoBlockText,
  StatsBlock,
  StatsBlockTitle,
  WatchListPageContentWrapper,
  StatsBlockValue,
} from "./styled"
import TopNav from "../../components/TopNav"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserFavourites } from "../../redux/slices/userSlice"
import { useEffect, useState } from "react"
import { ICryptoCurrency } from "../../typings/crypto"
import SimpleLoader from "../../components/Loaders/SimpleLoader"

const WatchList = () => {
  const userFavourites = useAppSelector(selectUserFavourites)
  const userCoins = useAppSelector(selectUserCoins)

  const [performers, setPerformers] = useState<{
    top: ICryptoCurrency
    worst: ICryptoCurrency
  } | null>(null)

  useEffect(() => {
    if (userFavourites.length >= 2) {
      const sorted = userFavourites
        .map((fav) => userCoins[fav])
        .sort(
          (a, b) =>
            (b.price_change_percentage_24h as number) -
            (a.price_change_percentage_24h as number)
        )

      setPerformers({ top: sorted[0], worst: sorted.pop() as ICryptoCurrency })
    } else if (userFavourites.length === 1) {
      setPerformers({
        top: userCoins[userFavourites[0]],
        worst: userCoins[userFavourites[0]],
      })
    }
  }, [userFavourites, userCoins])

  return (
    <WatchListPageContentWrapper>
      <TopNav title="Your WatchList" />
      <Row className="mb-4">
        <SingleHighlightCard title="Top Performer" coin={performers?.top} />
        <SingleHighlightCard title="Worst Performer" coin={performers?.worst} />
        <Col xs={12} md={6}>
          <Card>
            <div className="w-100 h-100 d-flex justify-content-center align-items-center px-3 py-2">
              <div className="me-3">
                <Binoculars fill="white" width="125px" height="125px" />
              </div>
              <InfoBlockText>
                This is your watchlist, you can watch for any coin and track it's
                performance here. Currently you are watching{" "}
                <span className="text-success fs-4">{userFavourites.length}</span> coins.
              </InfoBlockText>
            </div>
          </Card>
        </Col>
      </Row>
      <Card height="650px">
        <WatchListTableFull />
      </Card>
    </WatchListPageContentWrapper>
  )
}

export default WatchList

interface SingleHighlightCardProps {
  title: string
  coin: ICryptoCurrency | undefined
}

const SingleHighlightCard = ({ title, coin }: SingleHighlightCardProps) => {
  return (
    <Col xs={6} sm={6} md={3}>
      <Card>
        <StatsBlock>
          <StatsBlockTitle>{title}</StatsBlockTitle>
          <StatsBlockValue>
            {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : <SimpleLoader />}
          </StatsBlockValue>
        </StatsBlock>
      </Card>
    </Col>
  )
}
