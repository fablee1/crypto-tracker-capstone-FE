import { MyNav, NavWrapper } from "./styled"

const NavBar = () => {
  return (
    <NavWrapper>
      <MyNav defaultActiveKey="/home" className="flex-column">
        <MyNav.Link>Home</MyNav.Link>
        <MyNav.Link>Chart</MyNav.Link>
        <MyNav.Link>Alerts</MyNav.Link>
        <MyNav.Link>Watch List</MyNav.Link>
        <MyNav.Link>Stats</MyNav.Link>

        <MyNav.Link className="mt-auto mb-4">Profile</MyNav.Link>
      </MyNav>
    </NavWrapper>
  )
}

export default NavBar
