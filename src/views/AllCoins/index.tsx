import { Heading } from "./styled"
import Table from "react-bootstrap/Table"
import { useEffect, useState } from "react"
import backend from "../../backend"
import { AxiosResponse } from "axios"
import AllCoinsTableRow from "./AllCoinsTableRow"
import SimpleLoader from "../../components/Loaders/SimpleLoader"
import Card from "../../components/Card"

export interface IAllCoinsData {
  id: string
  circulating_supply: number
  current_price: number
  image: string
  market_cap: number
  market_cap_rank: number
  name: string
  price_change_percentage_24h: number
  symbol: string
  total_volume: number
  historical1D: {
    timestamp: number
    price: number
    _id: string
  }[]
}

const AllCoins = () => {
  const [allCoins, setAllCoins] = useState<IAllCoinsData[] | null>(null)

  useEffect(() => {
    const getAllCoins = async () => {
      const { data }: AxiosResponse<IAllCoinsData[]> = await backend.get("/crypto/full")
      setAllCoins(data)
    }
    getAllCoins()
  }, [])

  return (
    <div className="p-5">
      <Card className="px-5 py-4">
        <Heading>All Cryptocurrencies</Heading>
        <Table className="text-white">
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>Market Cap</th>
              <th>Volume</th>
              <th>Circulating Supply</th>
              <th>Last 30 days</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{allCoins && allCoins.map((c) => <AllCoinsTableRow data={c} />)}</tbody>
        </Table>
        {!allCoins && <SimpleLoader />}
      </Card>
    </div>
  )
}

export default AllCoins
