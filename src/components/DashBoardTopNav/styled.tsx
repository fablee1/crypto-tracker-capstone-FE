import styled from "styled-components"
import Button from "react-bootstrap/Button"

export const TopNav = styled.div`
  height: 65px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`

export const AddDataBtn = styled(Button)`
  border-radius: 5px;
  color: #242424;
  background-color: #33d10c;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  border: none;
  &:hover {
    background-color: #0ac50a;
  }
`
