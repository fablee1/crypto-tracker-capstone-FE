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
import { CoinValuePercentage } from "./styled"

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
    console.log(gains)

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
        <TopBarInfoBlock header="Net Worth">{`$${Math.round(
          data.netWorth
        ).toLocaleString()}`}</TopBarInfoBlock>
        <Divider />
        <TopBarInfoBlock header="Value Of Coins">{`$${Math.round(
          data.netWorth
        ).toLocaleString()}`}</TopBarInfoBlock>
        <TopBarInfoBlock header="Day's Gain" secondaryBlock>
          <ColoredValueWithPercentage value={data.dayGainPercent} isPercentage /> (
          <ColoredValueWithPercentage value={data.dayGain} />)
        </TopBarInfoBlock>
        <TopBarInfoBlock header="7d" secondaryBlock>
          <ColoredValueWithPercentage value={data.sevenDayGainPercent} isPercentage /> (
          <ColoredValueWithPercentage value={data.sevenDayGain} />)
        </TopBarInfoBlock>
        <Divider />
        <TopBarInfoBlock header="Invested Fiat">
          {`$${data.investedCash.toFixed(0)}`}
        </TopBarInfoBlock>
        <TopBarInfoBlock header="Return on Investment" secondaryBlock>
          <ColoredValueWithPercentage value={data.roiPercent} isPercentage /> (
          <ColoredValueWithPercentage value={data.roi} />)
        </TopBarInfoBlock>
        <Divider />
        <TopBarInfoBlock header="Investable Cash">
          {`$${data.investableCash.toFixed(0)}`}
        </TopBarInfoBlock>
      </CardWrapper>
    </TopBar>
  )
}

export default DashBoardTopBar

interface ColoredValueWithPercentageProps {
  value: number
  isPercentage?: boolean
}

const ColoredValueWithPercentage = ({
  value,
  isPercentage,
}: ColoredValueWithPercentageProps) => {
  return (
    <CoinValuePercentage value={value}>
      {isPercentage
        ? `${value < 0 ? "" : "+"}${value.toFixed()}%`
        : `$${
            value < 0
              ? parseFloat(value.toFixed()).toLocaleString().slice(1)
              : parseFloat(value.toFixed()).toLocaleString()
          }`}
    </CoinValuePercentage>
  )
}
