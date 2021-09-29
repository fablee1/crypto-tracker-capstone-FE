import { CardHeader, CardWrapper } from "./styled"

const Card = ({ children, title }: { children: JSX.Element; title: string }) => {
  return (
    <CardWrapper>
      <CardHeader>{title}</CardHeader>
      {children}
    </CardWrapper>
  )
}

export default Card
