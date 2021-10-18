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

interface TotalValueChartProps {
  data: { timestamp: number; invested: number; portfolioValue: number }[]
}

const TotalValueChart = ({ data }: TotalValueChartProps) => {
  const [chartData, setChartData] = useState<
    {
      date: string
      value: number
    }[]
  >([])

  const [scaledChartData, setScaledChartData] = useState<
    {
      date: string
      value: number
    }[]
  >([])

  const [chartScale, setChartScale] = useState("8M")

  useEffect(() => {
    const formattedData = data.map((d) => {
      return {
        date: new Date(d.timestamp).toLocaleString(),
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
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default TotalValueChart
