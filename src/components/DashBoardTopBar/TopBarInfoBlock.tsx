import { TopBarBlock, TopBarBlockHeader, TopBarBlockText } from "./styled"

const TopBarInfoBlock = ({
  header,
  text,
  secondaryBlock,
}: {
  header: string
  text: string
  secondaryBlock?: boolean
}) => {
  return (
    <TopBarBlock>
      <TopBarBlockHeader secondaryBlock={secondaryBlock}>{header}</TopBarBlockHeader>
      <TopBarBlockText secondaryBlock={secondaryBlock}>{text}</TopBarBlockText>
    </TopBarBlock>
  )
}

export default TopBarInfoBlock
