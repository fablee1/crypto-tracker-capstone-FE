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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const TopBarBlockHeader = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  line-height: 1;
  color: rgb(143, 143, 149);
`

export const TopBarBlockText = styled.p`
  font-size: 40px;
  font-weight: 700;
  margin: 0;
  line-height: 1;
  color: white;
`
