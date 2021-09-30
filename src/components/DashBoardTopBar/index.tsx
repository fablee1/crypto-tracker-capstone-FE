import { CardWrapper } from "../Card/styled"
import { Divider, TopBar } from "./styled"
import TopBarInfoBlock from "./TopBarInfoBlock"

const DashBoardTopBar = () => {
  return (
    <TopBar>
      <CardWrapper className="d-flex align-items-center">
        <TopBarInfoBlock header="Net Worth" text="$115,287" />
        <Divider />
        <TopBarInfoBlock header="Value Of Coins" text="$105,164" />
        <Divider />
        <TopBarInfoBlock header="Invested Fiat" text="$31,971" />
        <Divider />
        <TopBarInfoBlock header="Investable Cash" text="$10,123" />
      </CardWrapper>
    </TopBar>
  )
}

export default DashBoardTopBar
