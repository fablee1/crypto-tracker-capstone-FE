import styled from "styled-components"

export const CardWrapper = styled.div<{ height?: string }>`
  background-color: rgba(17, 21, 30, 1);
  padding: 15px;
  height: 100%;
  border-radius: 5px;
  height: ${(props) => props.height && props.height};
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const CardHeader = styled.h2`
  color: rgba(143, 143, 149, 1);
  font-size: 18px;
`
