import styled from "styled-components"
import Nav from "react-bootstrap/Nav"
import LinkBs from "react-bootstrap/NavLink"
import { Link } from "react-router-dom"

export const NavWrapper = styled.div`
  background-color: rgba(9, 13, 24, 1);
  color: white;
  height: 100%;
  width: 65px;
  position: fixed;
`

export const StyledLink = styled(Link)`
  color: gray;
  &:hover {
    color: white;
  }
  &:focus {
    color: white;
  }
`

export const MyNav = styled(Nav)`
  height: 100%;
`

const MyNavLink = styled(LinkBs)`
  padding: 0;
  margin-top: 35px;
  color: gray;
  display: flex;
  justify-content: center;
  &:hover {
    color: white;
  }
  &:focus {
    color: white;
  }
`

MyNav.Link = MyNavLink as any
