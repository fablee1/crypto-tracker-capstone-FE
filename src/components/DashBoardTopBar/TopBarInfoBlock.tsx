import { TopBarBlock, TopBarBlockHeader, TopBarBlockText } from "./styled"

const TopBarInfoBlock = ({ header, text }: { header: string; text: string }) => {
  return (
    <TopBarBlock>
      <TopBarBlockHeader>{header}</TopBarBlockHeader>
      <TopBarBlockText>{text}</TopBarBlockText>
    </TopBarBlock>
  )
}

export default TopBarInfoBlock
