import { CoverText, NoCoinCoverDiv } from "./styled"
import { ReactComponent as CryptoCover } from "../../img/nocoincovergradient.svg"

const NoCoinCover = () => {
  return (
    <NoCoinCoverDiv>
      <CryptoCover fill="white" className="svgAnimation" />
      <CoverText>
        <div>You don't have this coin in your portfolio yet.</div>
        <div>Add your first transaction to see stats.</div>
      </CoverText>
    </NoCoinCoverDiv>
  )
}

export default NoCoinCover
