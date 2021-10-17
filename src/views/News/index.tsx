import Card from "../../components/Card"
import TopNav from "../../components/TopNav"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import {
  NewsCardsContainer,
  NewsHeaderBlock,
  NewsHeaderBlockHeader,
  NewsPageContentWrapper,
  NewsTypeBtn,
  TickerWidgetWrapper,
} from "./styled"
import { useEffect, useState } from "react"
import backend from "../../backend"
import { INews } from "../../typings/news"
import NewsCard from "../../components/NewsCard"
import Row from "react-bootstrap/Row"
import SimpleLoader from "../../components/Loaders/SimpleLoader"

const News = () => {
  const [newsType, setNewsType] = useState("latest")
  const [news, setNews] = useState<INews[] | null>(null)

  useEffect(() => {
    const getNews = async () => {
      const { data } = await backend.get(`/news/${newsType}`)
      setNews(data)
    }
    getNews()
  }, [newsType])

  return (
    <NewsPageContentWrapper>
      <TopNav title="News" />
      <Card className="p-0">
        <TickerWidgetWrapper>
          <iframe
            title="tickerNews"
            src="https://widgetscdn.cryptomood.com/ticker-widget?theme=dark"></iframe>
        </TickerWidgetWrapper>
        <NewsHeaderBlock>
          <NewsHeaderBlockHeader>News</NewsHeaderBlockHeader>
        </NewsHeaderBlock>
        <NewsCardsWrapper newsType={newsType} setType={setNewsType}>
          <Row>
            {news ? (
              news.map((n) => (
                <NewsCard
                  image={n.imageurl}
                  published_on={n.published_on}
                  title={n.title}
                  url={n.url}
                  body={n.body}
                  categories={n.categories}
                  source={{ name: n.source_info.name, img: n.source_info.img }}
                />
              ))
            ) : (
              <SimpleLoader />
            )}
          </Row>
        </NewsCardsWrapper>
      </Card>
    </NewsPageContentWrapper>
  )
}

export default News

interface NewsCardsWrapperProps {
  children: any
  newsType: string
  setType: any
}

const NewsCardsWrapper = ({ children, newsType, setType }: NewsCardsWrapperProps) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <ButtonGroup aria-label="News Type">
          <NewsTypeBtn left onClick={() => setType("latest")}>
            Latest
          </NewsTypeBtn>
          <NewsTypeBtn right onClick={() => setType("popular")}>
            Popular
          </NewsTypeBtn>
        </ButtonGroup>
      </div>
      <NewsCardsContainer>{children}</NewsCardsContainer>
    </>
  )
}
