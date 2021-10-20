import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { HiSearch } from "react-icons/hi"
import { Link } from "react-router-dom"
import backend from "../../backend"
import { SearchForm, MySearch, SearchBtn, SearchResultsContainer } from "./styled"

interface Coins {
  name: string
  id: string
  image: string
  market_cap_rank: number
  symbol: string
}

const Search = () => {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)

  const [coins, setCoins] = useState<Coins[] | null>(null)

  const [sortedCoins, setSortedCoins] = useState<Coins[]>([])

  useEffect(() => {
    const getCoins = async () => {
      try {
        const { data }: AxiosResponse<Coins[]> = await backend.get("crypto/all")
        setCoins(data)
      } catch (err) {
        console.log(err)
      }
    }
    getCoins()
  }, [])

  useEffect(() => {
    if (coins) {
      setSortedCoins(
        coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase())
        )
      )
    }
  }, [query, coins])

  return (
    <div className="position-relative me-3">
      <MySearch className="ms-auto">
        <SearchBtn>
          <HiSearch size="1.2em" />
        </SearchBtn>
        <SearchForm
          placeholder="Search for coins"
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
          onFocus={(e: any) => setFocused(true)}
          onBlur={(e: any) => setTimeout(() => setFocused(false), 100)}
        />
      </MySearch>
      {query && focused && <SearchResultField data={sortedCoins.slice(0, 10)} />}
    </div>
  )
}

export default Search

const SearchResultField = ({ data }: { data: Coins[] }) => {
  return (
    <SearchResultsContainer>
      {data.map((coin) => (
        <Link to={`/coins/${coin.id}`}>
          <div className="d-flex">
            <div>{`#${coin.market_cap_rank}`}</div>
            <img src={coin.image} alt={coin.id} width="16px" />
            <div>{`${coin.symbol.toUpperCase()} ${coin.name}`}</div>
          </div>
        </Link>
      ))}
    </SearchResultsContainer>
  )
}
