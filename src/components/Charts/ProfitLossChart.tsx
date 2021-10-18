import { useEffect, useState } from "react"
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
} from "recharts"
import { CardHeader } from "../Card/styled"
import ChartBtns from "./ChartBtns"

interface ProfitLossChartProps {
  data: { timestamp: number; invested: number; portfolioValue: number }[]
}

const ProfitLossChart = ({ data }: ProfitLossChartProps) => {
  const [chartData, setChartData] = useState<
    {
      date: string
      invested: number
      value: number
    }[]
  >([])

  const [scaledChartData, setScaledChartData] = useState<
    {
      date: string
      invested: number
      value: number
    }[]
  >([])

  const [chartScale, setChartScale] = useState("8M")

  useEffect(() => {
    const formattedData = data.map((d) => {
      return {
        date: new Date(d.timestamp).toLocaleString(),
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
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="date" />
          <YAxis domain={[0, "dataMax"]} />
          <Tooltip />
          <Area
            type="monotone"
            stackId="1"
            dataKey="invested"
            stroke="#544f5c"
            fill="#544f5c"
          />
          <Area
            type="monotone"
            stackId="1"
            dataKey="value"
            stroke="#17d430"
            fill="#17d430"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default ProfitLossChart
