import styled from "styled-components"
import Nav from "react-bootstrap/Nav"
import Link from "react-bootstrap/NavLink"

export const NavWrapper = styled.div`
  background-color: rgba(9, 13, 24, 1);
  color: white;
  height: 100%;
  width: 80px;
  position: fixed;
`

export const MyNav = styled(Nav)`
  height: 100%;
`

const MyNavLink = styled(Link)`
  margin-top: 35px;
  color: gray;
  display: flex;
  justify-content: center;
  &:hover {
    color: white;
  }
`

MyNav.Link = MyNavLink as any
