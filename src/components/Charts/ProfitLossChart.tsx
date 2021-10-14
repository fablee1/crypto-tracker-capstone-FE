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
  )
}

export default ProfitLossChart
