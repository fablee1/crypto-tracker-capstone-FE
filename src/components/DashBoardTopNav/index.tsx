import { AddDataBtn, Heading, StatBlockText, TopNav } from "./styled"
import { AiFillPlusCircle } from "react-icons/ai"
import { useState, useEffect } from "react"
import AddDataModal from "../AddDataModal"
import Search from "./search"
import { AxiosResponse } from "axios"
import { IMarketData } from "../../typings/market"
import backend from "../../backend"

const DashBoardTopNav = () => {
  const [show, setShow] = useState(false)

  const [marketData, setMarketData] = useState({
    total_market_cap: 0,
    btc_dominance: 0,
    cryptos: 0,
    exchanges: 0,
  })

  useEffect(() => {
    const getMarketData = async () => {
      const { data }: AxiosResponse<IMarketData> = await backend.get("/crypto/market")
      setMarketData(data)
    }
    getMarketData()
  }, [])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <TopNav>
      <Heading>Your Dashboard</Heading>

      <div className="mx-auto d-flex">
        <StatBlock title="Cryptos: " value={`${marketData.cryptos.toLocaleString()}`} />
        <StatBlock
          title="Exchanges: "
          value={`${marketData.exchanges.toLocaleString()}`}
        />
        <StatBlock
          title="Market Cap: "
          value={`$${Math.round(marketData.total_market_cap).toLocaleString()}`}
        />
        <StatBlock
          title="BTC Dominance: "
          value={`${marketData.btc_dominance.toFixed(2)}%`}
        />
      </div>

      <Search />

      <AddDataBtn className="d-flex align-items-center" onClick={handleShow}>
        <AiFillPlusCircle size="1.2em" className="me-1" />
        <div>Add your data</div>
      </AddDataBtn>
      <AddDataModal show={show} close={handleClose} />
    </TopNav>
  )
}

export default DashBoardTopNav

interface StatBlockProps {
  title: string
  value: string | number
}

const StatBlock = ({ title, value }: StatBlockProps) => {
  return (
    <div className="ms-5">
      <StatBlockText>{title}</StatBlockText>
      <StatBlockText value>{value}</StatBlockText>
    </div>
  )
}
