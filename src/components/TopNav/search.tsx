import { HiSearch } from "react-icons/hi"
import { SearchForm, MySearch, SearchBtn } from "./styled"

const Search = () => {
  return (
    <MySearch className="ms-auto me-3">
      <SearchBtn>
        <HiSearch size="1.2em" />
      </SearchBtn>
      <SearchForm placeholder="Search for coins" />
    </MySearch>
  )
}

export default Search
