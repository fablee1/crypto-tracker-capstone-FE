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
  data: { timestamp: number; price: number }[]
}

const CoinPriceChart = ({ data }: TotalValueChartProps) => {
  const [chartData, setChartData] = useState<
    {
      date: string
      value: number
    }[]
  >([])

  useEffect(() => {
    const formattedData = data.map((d) => {
      return {
        value: d.price,
        date: new Date(d.timestamp).toLocaleString(),
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
        <YAxis domain={["auto", "dataMax"]} />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#084288" fill="#084288" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default CoinPriceChart
