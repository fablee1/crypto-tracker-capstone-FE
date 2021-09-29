import NavBar from "../../components/NavBar"
import DashBoard from "../DashBoard"
import { ContentWrapper, MainWrapper } from "./styled"

const Main = () => {
  return (
    <MainWrapper>
      <NavBar />
      <ContentWrapper>
        <DashBoard />
      </ContentWrapper>
    </MainWrapper>
  )
}

export default Main
