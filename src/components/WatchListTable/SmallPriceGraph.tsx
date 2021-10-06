import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface SmallPriceGraphProps {
  history: { timestamp: number; price: number; _id: string }[]
}

const SmallPriceGraph = ({ history }: SmallPriceGraphProps) => {
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState<any>([])

  useEffect(() => {
    const dataMax = Math.max(...history.map((i) => i.price))
    const dataMin = Math.min(...history.map((i) => i.price))

    // if (dataMax <= 0) {
    //   setOffset(0)
    // } else if (dataMin >= 0) {
    //   setOffset(1)
    // } else {
    setOffset(dataMax / (dataMax - dataMin))

    const newData = history.map((day) => {
      return { time: day.timestamp, price: day.price, t: day.timestamp }
    })
    setData(newData)
  }, [history])
  return (
    <ResponsiveContainer width={"99%"} height={50}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}>
        {/* <CartesianGrid /> */}
        <XAxis dataKey="time" hide={true} />
        <YAxis domain={["auto", "auto"]} hide={true} />
        <Tooltip />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={0.5} stopColor="green" stopOpacity={1} />
            <stop offset={0.5} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke="#000"
          fill="url(#splitColor)"
          baselineShift={0.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SmallPriceGraph
