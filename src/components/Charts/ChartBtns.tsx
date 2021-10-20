import { ChartBtn } from "./styled"

const ChartBtns = ({
  setChartScale,
  chartScale,
}: {
  setChartScale: any
  chartScale: string
}) => {
  return (
    <div className="d-flex">
      <ChartBtn selected={chartScale === "1M"} onClick={() => setChartScale("1M")}>
        1M
      </ChartBtn>
      <ChartBtn selected={chartScale === "3M"} onClick={() => setChartScale("3M")}>
        3M
      </ChartBtn>
      <ChartBtn selected={chartScale === "8M"} onClick={() => setChartScale("8M")}>
        8M
      </ChartBtn>
    </div>
  )
}

export default ChartBtns
