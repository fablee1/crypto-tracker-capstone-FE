import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectUserCoins, selectUserPortfolio } from "../../redux/slices/userSlice"
import { CardWrapper } from "../Card/styled"
import { Divider, TopBar } from "./styled"
import TopBarInfoBlock from "./TopBarInfoBlock"
import BigNumber from "bignumber.js"

const DashBoardTopBar = () => {
  const userPortfolio = useAppSelector(selectUserPortfolio)
  const userCoins = useAppSelector(selectUserCoins)

  const [netWorth, setNetWorth] = useState(0)
  const [gains, setGains] = useState({ dayGain: 0, sevenDayGain: 0 })

  useEffect(() => {
    const nw = userPortfolio.reduce((prev, curr) => {
      return new BigNumber(curr.amount)
        .multipliedBy(userCoins[curr.coinId].current_price)
        .plus(prev)
        .toNumber()
    }, 0)
    setNetWorth(nw)

    const gains = userPortfolio.reduce(
      (prev, curr) => {
        return {
          dayGain: new BigNumber(curr.amount)
            .multipliedBy(userCoins[curr.coinId].price_change_24h as number)
            .plus(prev.dayGain)
            .toNumber(),
          sevenDayGain: new BigNumber(
            userCoins[curr.coinId].current_price -
              userCoins[curr.coinId].historical1D.at(-7).price
          )
            .multipliedBy(curr.amount)
            .plus(prev.sevenDayGain)
            .toNumber(),
        }
      },
      {
        dayGain: 0,
        sevenDayGain: 0,
      }
    )
    setGains(gains)
  }, [userPortfolio, userCoins])

  return (
    <TopBar>
      <CardWrapper className="d-flex align-items-center">
        <TopBarInfoBlock header="Net Worth" text={`$${netWorth}`} />
        <Divider />
        <TopBarInfoBlock header="Value Of Coins" text={`$${netWorth}`} />
        <TopBarInfoBlock
          header="Day's Gain"
          text={`${new BigNumber(gains.dayGain)
            .dividedBy(netWorth - gains.dayGain)
            .multipliedBy(100)
            .toFixed(0)}% ($${gains.dayGain.toFixed(0)})`}
          secondaryBlock
        />
        <TopBarInfoBlock
          header="7d"
          text={`${new BigNumber(gains.sevenDayGain)
            .dividedBy(netWorth - gains.sevenDayGain)
            .multipliedBy(100)
            .toFixed(0)}% ($${gains.sevenDayGain.toFixed(0)})`}
          secondaryBlock
        />
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
