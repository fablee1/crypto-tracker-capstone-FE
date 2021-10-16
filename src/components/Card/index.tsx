import { CardHeader, CardWrapper } from "./styled"

const Card = ({
  children,
  title,
  height,
  className,
}: {
  children: any
  title?: string
  height?: string
  className?: string
}) => {
  return (
    <CardWrapper height={height} className={className}>
      {title && <CardHeader>{title}</CardHeader>}
      {children}
    </CardWrapper>
  )
}

export default Card
