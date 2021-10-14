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

  useEffect(() => {
    const formattedData = data.map((d) => {
      return {
        date: new Date(d.timestamp).toLocaleString(),
        value: d.invested + d.portfolioValue,
      }
    })
    setChartData(formattedData)
  }, [data])
  return (
    <ResponsiveContainer height="90%">
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default TotalValueChart
