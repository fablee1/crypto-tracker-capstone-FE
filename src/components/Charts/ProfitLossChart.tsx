import { useEffect, useState } from "react"
import { AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Area } from "recharts"
import { getDayMonthString } from "../../utils/dates"
import { CardHeader } from "../Card/styled"
import ChartBtns from "./ChartBtns"

interface ProfitLossChartProps {
  data: { timestamp: number; invested: number; portfolioValue: number }[]
}

const ProfitLossChart = ({ data }: ProfitLossChartProps) => {
  const [chartData, setChartData] = useState<
    {
      date: number
      invested: number
      value: number
    }[]
  >([])

  const [scaledChartData, setScaledChartData] = useState<
    {
      date: number
      invested: number
      value: number
    }[]
  >([])

  const [chartScale, setChartScale] = useState("8M")

  useEffect(() => {
    const formattedData = data.map((d) => {
      return {
        date: d.timestamp,
        invested: d.invested,
        value: d.portfolioValue,
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
        <CardHeader>Profit / Loss</CardHeader>
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
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#55555c" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#55555c" stopOpacity={0.4} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#17d430" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#17d430" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={getDayMonthString}
            minTickGap={65}
            tickMargin={5}
            tick={{ fontSize: "14px" }}
          />
          <YAxis
            domain={[0, "auto"]}
            tick={{ fontSize: "14px" }}
            tickFormatter={(tick: number) => (tick > 999 ? `${tick / 1000}k` : `${tick}`)}
          />
          <Tooltip />
          <Area stackId={1} dataKey="invested" stroke="#544f5c" fill="url(#colorUv)" />
          <Area stackId={1} dataKey="value" stroke="#17d430" fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default ProfitLossChart
