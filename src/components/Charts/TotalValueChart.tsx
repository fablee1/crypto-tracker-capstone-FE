import { useEffect, useState } from "react"
import { AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Area } from "recharts"
import { getDayMonthString } from "../../utils/dates"
import { CardHeader } from "../Card/styled"
import ChartBtns from "./ChartBtns"

interface TotalValueChartProps {
  data: { timestamp: number; invested: number; portfolioValue: number }[]
}

const TotalValueChart = ({ data }: TotalValueChartProps) => {
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
        timestamp: d.timestamp,
        value: d.invested + d.portfolioValue,
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
        <CardHeader>Portfolio value over time</CardHeader>
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
          <defs>
            <linearGradient id="colorTotalValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={getDayMonthString}
            minTickGap={65}
            tickMargin={5}
            tick={{ fontSize: "14px" }}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: "14px" }}
            tickFormatter={(tick: number) => (tick > 999 ? `${tick / 1000}k` : `${tick}`)}
          />
          <Tooltip />
          <Area dataKey="value" stroke="#8884d8" fill="url(#colorTotalValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default TotalValueChart
