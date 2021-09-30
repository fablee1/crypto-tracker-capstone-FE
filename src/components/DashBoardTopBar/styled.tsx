import styled from "styled-components"

export const TopBar = styled.div`
  height: 115px;
  margin-bottom: 16px;
`

export const Divider = styled.div`
  background-color: #5f5f5f;
  margin: 0 25px;
  width: 1px;
  height: 75px;
`

export const TopBarBlock = styled.div`
  height: 100%;
  padding: 10px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

interface TopBarProps {
  secondaryBlock?: boolean
}

export const TopBarBlockHeader = styled.p<TopBarProps>`
  font-size: 20px;
  font-weight: ${(props) => (props.secondaryBlock ? 400 : 600)};
  text-align: ${(props) => (props.secondaryBlock ? "center" : "left")};
  margin: 0;
  line-height: 1;
  color: rgb(143, 143, 149);
`

export const TopBarBlockText = styled.p<TopBarProps>`
  font-size: ${(props) => (props.secondaryBlock ? "24px" : "40px")};
  font-weight: ${(props) => (props.secondaryBlock ? 500 : 700)};
  margin: 0;
  line-height: 1;
  color: ${(props) => (props.secondaryBlock ? "rgb(119, 192, 96)" : "white")};
`
