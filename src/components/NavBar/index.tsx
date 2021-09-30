import { MyNav, NavWrapper } from "./styled"
import { AiFillHome } from "react-icons/ai"
import { HiChartSquareBar } from "react-icons/hi"

const NavBar = () => {
  return (
    <NavWrapper>
      <MyNav defaultActiveKey="/home" className="flex-column">
        <MyNav.Link>
          <AiFillHome size="2.2em" />
        </MyNav.Link>
        <MyNav.Link>
          <HiChartSquareBar size="2.2em" />
        </MyNav.Link>
        <MyNav.Link>Alerts</MyNav.Link>
        <MyNav.Link>Watch List</MyNav.Link>
        <MyNav.Link>Stats</MyNav.Link>

        <MyNav.Link className="mt-auto mb-4">Profile</MyNav.Link>
      </MyNav>
    </NavWrapper>
  )
}

export default NavBar
