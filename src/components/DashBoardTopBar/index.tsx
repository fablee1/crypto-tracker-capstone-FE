import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import {
  selectUserCoins,
  selectUserPortfolio,
  selectUserTransactions,
} from "../../redux/slices/userSlice"
import { CardWrapper } from "../Card/styled"
import { Divider, TopBar } from "./styled"
import TopBarInfoBlock from "./TopBarInfoBlock"
import BigNumber from "bignumber.js"

const DashBoardTopBar = () => {
  const userPortfolio = useAppSelector(selectUserPortfolio)
  const userCoins = useAppSelector(selectUserCoins)
  const userTransactions = useAppSelector(selectUserTransactions)

  const [data, setData] = useState({
    netWorth: 0,
    dayGain: 0,
    dayGainPercent: 0,
    sevenDayGain: 0,
    sevenDayGainPercent: 0,
    investedCash: 0,
    roi: 0,
    roiPercent: 0,
    investableCash: 0,
  })

  useEffect(() => {
    const nw = userPortfolio.reduce((prev, curr) => {
      return new BigNumber(curr.amount)
        .multipliedBy(userCoins[curr.coinId].current_price)
        .plus(prev)
        .toNumber()
    }, 0)

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

    const invested = userTransactions.reduce((prev, curr) => {
      if (curr.type === "buy" && curr.for?.toLowerCase() === "usd" && curr.total) {
        return prev + curr.total
      } else {
        return prev
      }
    }, 0)

    const daysGainPercent = new BigNumber(gains.dayGain)
      .dividedBy(nw - gains.dayGain)
      .multipliedBy(100)
      .toNumber()

    const sevenDayGainPercent = new BigNumber(gains.sevenDayGain)
      .dividedBy(nw - gains.sevenDayGain)
      .multipliedBy(100)
      .toNumber()

    const roi = new BigNumber(nw).minus(invested).toNumber()

    const roiPercent = new BigNumber(roi).dividedBy(invested).multipliedBy(100).toNumber()

    const investableCash = userTransactions.reduce((prev, curr) => {
      if (curr.type === "sell" && curr.for?.toLowerCase() === "usd" && curr.total) {
        return prev + curr.total
      }
      return prev
    }, 0)

    setData({
      netWorth: nw,
      dayGain: gains.dayGain,
      dayGainPercent: daysGainPercent,
      sevenDayGain: gains.sevenDayGain,
      sevenDayGainPercent: sevenDayGainPercent,
      investedCash: invested,
      roi: roi,
      roiPercent: roiPercent,
      investableCash: investableCash,
    })
  }, [userPortfolio, userCoins, userTransactions])

  return (
    <TopBar>
      <CardWrapper className="d-flex align-items-center">
        <TopBarInfoBlock header="Net Worth" text={`$${data.netWorth}`} />
        <Divider />
        <TopBarInfoBlock header="Value Of Coins" text={`$${data.netWorth}`} />
        <TopBarInfoBlock
          header="Day's Gain"
          text={`${data.dayGainPercent.toFixed(0)}% ($${data.dayGain.toFixed(0)})`}
          secondaryBlock
        />
        <TopBarInfoBlock
          header="7d"
          text={`${data.sevenDayGainPercent.toFixed(0)}% ($${data.sevenDayGain.toFixed(
            0
          )})`}
          secondaryBlock
        />
        <Divider />
        <TopBarInfoBlock
          header="Invested Fiat"
          text={`$${data.investedCash.toFixed(0)}`}
        />
        <TopBarInfoBlock
          header="Return on Investment"
          text={`${data.roiPercent.toFixed(0)}% ($${data.roi.toFixed(0)})`}
          secondaryBlock
        />
        <Divider />
        <TopBarInfoBlock
          header="Investable Cash"
          text={`$${data.investableCash.toFixed(0)}`}
        />
      </CardWrapper>
    </TopBar>
  )
}

export default DashBoardTopBar
