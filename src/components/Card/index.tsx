import { CardHeader, CardWrapper } from "./styled"

const Card = ({
  children,
  title,
  height,
}: {
  children: JSX.Element
  title: string
  height?: string
}) => {
  return (
    <CardWrapper height={height}>
      <CardHeader>{title}</CardHeader>
      {children}
    </CardWrapper>
  )
}

export default Card
