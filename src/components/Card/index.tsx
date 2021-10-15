import { CardHeader, CardWrapper } from "./styled"

const Card = ({
  children,
  title,
  height,
}: {
  children: any
  title?: string
  height?: string
}) => {
  return (
    <CardWrapper height={height}>
      {title && <CardHeader>{title}</CardHeader>}
      {children}
    </CardWrapper>
  )
}

export default Card
