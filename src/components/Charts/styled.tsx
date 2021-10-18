import styled from "styled-components"

export const ChartBtn = styled.button<{ selected?: boolean }>`
  width: 45px;
  height: 25px;
  font-size: 12px;
  line-height: 1;
  background-color: transparent;
  border: ${(props) =>
    props.selected ? "1px solid white" : "1px solid rgb(124, 126, 133)"};
  color: ${(props) => (props.selected ? "white" : "rgb(124, 126, 133)")};
  &:hover {
    color: white;
    border: 1px solid white;
  }
`
