import styled from "styled-components"

export const StatsBlockWrapper = styled.div<{
  borderR?: boolean
  borderL?: boolean
}>`
  border-left: ${(props) => (props.borderL ? "1px solid #ffffff49" : "none")};
  border-right: ${(props) => (props.borderR ? "1px solid #ffffff49" : "none")};
  height: 100%;
  margin-bottom: 38px;
`

export const StatsBlockTitle = styled.div`
  color: #a1a7bb;
`

export const StatsBlockValue = styled.div`
  color: #ffffff;
  font-size: 44px;
  line-height: 1;
`

export const StatsWrapper = styled.div`
  padding: 15px 15px;
`
