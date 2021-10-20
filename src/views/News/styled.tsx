import styled from "styled-components"
import Button from "react-bootstrap/Button"

export const NewsPageContentWrapper = styled.div`
  padding: 10px 75px;
`

export const TickerWidgetWrapper = styled.div`
  height: 40px;
  transition: all 0.8s;
  display: flex;
  overflow: hidden;
  z-index: 2;
  flex-direction: column;
  width: 100%;
  position: sticky;
  top: 0;
`

export const NewsHeaderBlock = styled.div`
  padding: 10px 30px;
  display: flex;
`

export const NewsHeaderBlockHeader = styled.div`
  font-size: 50px;
  color: white;
  font-weight: 500;
`

export const NewsCardsContainer = styled.div`
  border: 1px solid #ffffff03;
  border-top: none;
  margin: 0 40px 30px 40px;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 250px 25px inset rgb(30, 36, 52);
`

export const NewsTypeBtn = styled(Button)`
  border-bottom-left-radius: ${(props) => props.left && "0px"};
  border-bottom-right-radius: ${(props) => props.right && "0px"};
  background-color: ${(props) => (props.selected ? "#181d2a" : "transparent")};
  color: ${(props) => (props.selected ? "white" : "#ffffff89")};
  border: none;
  box-shadow: none;
  width: 200px;
  font-size: 20px;
  &:focus {
    background-color: #181d2a;
    box-shadow: none;
    border: none;
  }
  &:hover {
    background-color: #181d2a;
    box-shadow: none;
    border: none;
  }
  &:active {
    background-color: #181d2a;
    box-shadow: none;
    border: none;
  }
  &:active:focus {
    background-color: #181d2a;
    box-shadow: none;
    border: none;
  }
`
