import Nav from "react-bootstrap/Nav"
import { MyNav, NavWrapper } from "./styled"

const NavBar = () => {
  return (
    <NavWrapper>
      <MyNav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home" className="mt-3">
          Home
        </Nav.Link>
        <Nav.Link eventKey="link-1" className="mt-4">
          Chart
        </Nav.Link>
        <Nav.Link eventKey="link-2" className="mt-4">
          Alerts
        </Nav.Link>
        <Nav.Link eventKey="link-3" className="mt-4">
          Watch List
        </Nav.Link>
        <Nav.Link eventKey="link-4" className="mt-4">
          Stats
        </Nav.Link>

        <Nav.Link eventKey="link-5" className="mt-auto mb-3">
          Profile
        </Nav.Link>
      </MyNav>
    </NavWrapper>
  )
}

export default NavBar
