import styled from "styled-components"

export const CoinRowTr = styled.tr`
  border-bottom: 1px solid rgb(34, 37, 49);
  border-top: 1px solid rgb(34, 37, 49);
  height: 62px;
  font-size: 14px;
  font-weight: 500;
`

export const CoinRowTd = styled.td`
  vertical-align: middle;
`

export const CoinRowName = styled.span`
  font-size: 16px;
  text-decoration: none !important;
  color: white;
  vertical-align: middle;
`

export const CoinValuePercentage = styled.span<{ value: number; size?: string }>`
  color: ${(props) => (props.value < 0 ? "rgb(234, 57, 67)" : "rgb(22, 199, 132)")};
  font-size: ${(props) => props.size && props.size};
`
