import styled from "styled-components"

export const CardWrapper = styled.div<{ height?: string }>`
  background-color: rgba(17, 21, 30, 1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 15px;
  height: 100%;
  border-radius: 5px;
  height: ${(props) => props.height && props.height};
  overflow: ${(props) => props.height && "auto"};
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
`

export const CardHeader = styled.h2`
  color: rgba(143, 143, 149, 1);
  font-size: 19px;
`
