import { MyNav, NavWrapper, StyledLink } from "./styled"
import { AiFillHome, AiFillStar } from "react-icons/ai"
import { HiChartSquareBar } from "react-icons/hi"
import { IoMdAlarm } from "react-icons/io"
import { RiNewspaperFill } from "react-icons/ri"
import { FaUserCircle, FaListAlt } from "react-icons/fa"

const NavBar = () => {
  return (
    <NavWrapper>
      <MyNav defaultActiveKey="/home" className="flex-column">
        <MyNav.Link>
          <StyledLink to="/">
            <AiFillHome size="2.2em" />
          </StyledLink>
        </MyNav.Link>
        <MyNav.Link>
          <HiChartSquareBar size="2.2em" />
        </MyNav.Link>
        <MyNav.Link>
          <IoMdAlarm size="2.2em" />
        </MyNav.Link>
        <MyNav.Link>
          <StyledLink to="/watchlist">
            <AiFillStar size="2.2em" />
          </StyledLink>
        </MyNav.Link>
        <MyNav.Link>
          <StyledLink to="/news">
            <RiNewspaperFill size="2.1em" />
          </StyledLink>
        </MyNav.Link>
        <MyNav.Link>
          <StyledLink to="/cryptos">
            <FaListAlt size="2em" />
          </StyledLink>
        </MyNav.Link>

        <MyNav.Link className="mt-auto mb-4">
          <FaUserCircle size="2.2em" />
        </MyNav.Link>
      </MyNav>
    </NavWrapper>
  )
}

export default NavBar
