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
        <TopBarInfoBlock header="Day's Gain" text="+10% ($12,122)" secondaryBlock />
        <TopBarInfoBlock header="7d" text="+16% ($12,122)" secondaryBlock />
        <Divider />
        <TopBarInfoBlock header="Invested Fiat" text="$31,971" />
        <TopBarInfoBlock
          header="Return on Investment"
          text="+7,226% ($83,316)"
          secondaryBlock
        />
        <Divider />
        <TopBarInfoBlock header="Investable Cash" text="$10,123" />
      </CardWrapper>
    </TopBar>
  )
}

export default DashBoardTopBar
