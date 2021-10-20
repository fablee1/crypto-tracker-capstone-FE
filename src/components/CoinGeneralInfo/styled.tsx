import styled from "styled-components"

export const InfoBlockWrapper = styled.div<{
  borderR?: boolean
  borderL?: boolean
}>`
  border-left: ${(props) => (props.borderL ? "1px solid #ffffff49" : "none")};
  border-right: ${(props) => (props.borderR ? "1px solid #ffffff49" : "none")};
  height: 100%;
  margin-bottom: 40px;
`

export const GeneralInfoBlockTitle = styled.div`
  color: #a1a7bb;
`

export const GeneralInfoBlockValue = styled.div<{ valueBig?: boolean }>`
  color: #ffffff;
  font-size: ${(props) => (props.valueBig ? "44px" : "initial")};
  line-height: 1;
`

export const GeneralInfoWrapper = styled.div`
  padding: 15px 15px;
`
