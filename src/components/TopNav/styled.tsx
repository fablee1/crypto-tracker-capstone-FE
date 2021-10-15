import styled from "styled-components"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

export const TopNavBox = styled.div`
  height: 65px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`

export const AddDataBtn = styled(Button)`
  border-radius: 5px;
  color: white;
  background-color: rgb(56, 97, 251);
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  border: none;
  &:hover {
    background-color: rgb(66, 113, 252);
  }
`

export const MySearch = styled(InputGroup)`
  width: 200px;
  box-shadow: 0px 0px 2px 0px rgba(255, 255, 255, 0.57);
`

export const SearchForm = styled(FormControl)`
  background: transparent;
  border: none;
  color: white;
  &:hover {
    background: none;
  }
  &:active,
  :focus,
  :active:focus {
    color: white;
    background: none;
    box-shadow: none;
  }
`

export const SearchBtn = styled(Button)`
  background: transparent;
  border: none;
  color: #c5c5c5;
  &:hover {
    color: white;
    background: none;
  }
  &:active,
  :focus,
  :active:focus {
    background: none;
    box-shadow: none;
  }
`

export const Heading = styled.h2`
  color: white;
`

interface StatBlockTextProps {
  value?: boolean
}

export const StatBlockText = styled.span<StatBlockTextProps>`
  color: ${(props) => (props.value ? "rgb(97, 136, 255)" : "rgb(161, 167, 187)")};
  margin: 0;
  font-weight: 600;
`
