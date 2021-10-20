import Table from "react-bootstrap/Table"
import { useEffect, useState } from "react"
import backend from "../../backend"
import { AxiosResponse } from "axios"
import SimpleLoader from "../../components/Loaders/SimpleLoader"
import Card from "../../components/Card"
import TopNav from "../../components/TopNav"
import TableCoinRow from "../../components/TableCoinRow"

export interface IAllCoinsData {
  id: string
  circulating_supply: number
  current_price: number
  image: string
  market_cap: number
  market_cap_rank: number
  name: string
  price_change_percentage_24h: number
  price_change_24h: number
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
    <div className="px-5">
      <TopNav title="All Cryptocurrencies" />
      <Card className="px-5 py-4">
        <Table className="text-white" borderless>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Name</th>
              <th className="text-end">Price</th>
              <th className="text-center">24h %</th>
              <th className="text-center">7d %</th>
              <th className="text-end">Market Cap</th>
              <th className="text-end">Volume</th>
              <th className="text-end">Circulating Supply</th>
              <th className="text-end">Last 30 days</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allCoins &&
              allCoins.map((c) => (
                <TableCoinRow
                  id={c.id}
                  favouriteBtn
                  img={c.image}
                  symbol={c.symbol}
                  name={c.name}
                  price={c.current_price}
                  price_change_24h_perc={c.price_change_percentage_24h}
                  price_change_24h={c.price_change_24h}
                  price7dAgo={(c.historical1D as any).at(-7)["price"]}
                  market_cap={c.market_cap}
                  market_cap_rank={c.market_cap_rank}
                  volume={c.total_volume}
                  circ_supply={c.circulating_supply}
                  historical1D={c.historical1D}
                />
              ))}
          </tbody>
        </Table>
        {!allCoins && <SimpleLoader />}
      </Card>
    </div>
  )
}

export default AllCoins
