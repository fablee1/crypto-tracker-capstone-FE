import { useEffect, useState } from "react"
import { AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Area } from "recharts"
import { getDayMonthString } from "../../utils/dates"
import { CardHeader } from "../Card/styled"
import ChartBtns from "./ChartBtns"

interface TotalValueChartProps {
  data: { timestamp: number; price: number }[]
}

const CoinPriceChart = ({ data }: TotalValueChartProps) => {
  const [chartData, setChartData] = useState<
    {
      timestamp: number
      value: number
    }[]
  >([])

  const [scaledChartData, setScaledChartData] = useState<
    {
      timestamp: number
      value: number
    }[]
  >([])

  const [chartScale, setChartScale] = useState("8M")

  useEffect(() => {
    const formattedData = data.map((d) => {
      return {
        value: d.price,
        timestamp: d.timestamp,
      }
    })
    setChartData(formattedData)
  }, [data])

  useEffect(() => {
    if (chartScale === "1M") {
      setScaledChartData(chartData.slice(-30))
    } else if (chartScale === "3M") {
      setScaledChartData(chartData.slice(-90))
    } else if (chartScale === "8M") {
      setScaledChartData(chartData)
    }
  }, [chartScale, chartData])
  return (
    <>
      <div className="d-flex justify-content-between">
        <CardHeader>Price Chart</CardHeader>
        <ChartBtns setChartScale={setChartScale} chartScale={chartScale} />
      </div>
      <ResponsiveContainer height="90%">
        <AreaChart
          data={scaledChartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={getDayMonthString}
            minTickGap={65}
            tickMargin={5}
            tick={{ fontSize: "14px" }}
          />
          <YAxis
            domain={["auto", "dataMax"]}
            tick={{ fontSize: "14px" }}
            tickFormatter={(tick: number) => (tick > 999 ? `${tick / 1000}k` : `${tick}`)}
          />
          <Tooltip />
          <Area dataKey="value" stroke="#084288" fill="#084288" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default CoinPriceChart
