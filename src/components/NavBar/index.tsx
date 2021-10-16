import { MyNav, NavWrapper } from "./styled"
import { AiFillHome, AiFillStar } from "react-icons/ai"
import { HiChartSquareBar } from "react-icons/hi"
import { IoMdAlarm } from "react-icons/io"
import { FaUserCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <NavWrapper>
      <MyNav defaultActiveKey="/home" className="flex-column">
        <MyNav.Link>
          <Link to="/">
            <AiFillHome size="2.2em" />
          </Link>
        </MyNav.Link>
        <MyNav.Link>
          <HiChartSquareBar size="2.2em" />
        </MyNav.Link>
        <MyNav.Link>
          <IoMdAlarm size="2.2em" />
        </MyNav.Link>
        <MyNav.Link>
          <Link to="/watchlist">
            <AiFillStar size="2.2em" />
          </Link>
        </MyNav.Link>
        <MyNav.Link>Stats</MyNav.Link>
        <MyNav.Link>
          <Link to="/cryptos">All Coins</Link>
        </MyNav.Link>

        <MyNav.Link className="mt-auto mb-4">
          <FaUserCircle size="2.2em" />
        </MyNav.Link>
      </MyNav>
    </NavWrapper>
  )
}

export default NavBar
