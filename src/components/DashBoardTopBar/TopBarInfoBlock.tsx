import { TopBarBlock, TopBarBlockHeader, TopBarBlockText } from "./styled"

const TopBarInfoBlock = ({
  header,
  children,
  secondaryBlock,
}: {
  header: string
  children: any
  secondaryBlock?: boolean
}) => {
  return (
    <TopBarBlock>
      <TopBarBlockHeader secondaryBlock={secondaryBlock}>{header}</TopBarBlockHeader>
      <TopBarBlockText secondaryBlock={secondaryBlock}>{children}</TopBarBlockText>
    </TopBarBlock>
  )
}

export default TopBarInfoBlock
