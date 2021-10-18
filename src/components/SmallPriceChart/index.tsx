import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface SmallPriceChartProps {
  history: { timestamp: number; price: number; _id: string }[]
}

const SmallPriceChart = ({ history }: SmallPriceChartProps) => {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    const newData = history.map((day) => {
      return { time: day.timestamp, price: day.price, t: day.timestamp }
    })
    setData(newData)
  }, [history])
  return (
    <ResponsiveContainer width={"99%"} height={45}>
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}>
        <XAxis dataKey="time" hide={true} />
        <YAxis domain={["auto", "auto"]} hide={true} />
        <Line
          dataKey="price"
          stroke={
            data[0]?.price < data.at(-1)?.price ? "rgb(79 194 128)" : "rgb(214 69 93)"
          }
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SmallPriceChart
