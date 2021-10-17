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
  flex-direction: column;
  width: 100%;
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
  border: 1px solid white;
  margin: 0 15px 15px 15px;
  border-radius: 15px;
`

export const NewsTypeBtn = styled(Button)`
  border-bottom-left-radius: ${(props) => props.left && "0px"};
  border-bottom-right-radius: ${(props) => props.right && "0px"};
`
