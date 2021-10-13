import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface SmallPriceGraphProps {
  history: { timestamp: number; price: number; _id: string }[]
}

const SmallPriceGraph = ({ history }: SmallPriceGraphProps) => {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    const newData = history.map((day) => {
      return { time: day.timestamp, price: day.price, t: day.timestamp }
    })
    setData(newData)
  }, [history])
  return (
    <ResponsiveContainer width={"99%"} height={50}>
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
          stroke={data[0]?.price < data.at(-1)?.price ? "green" : "red"}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SmallPriceGraph
