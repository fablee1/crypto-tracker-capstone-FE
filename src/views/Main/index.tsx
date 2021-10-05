import { useEffect } from "react"
import NavBar from "../../components/NavBar"
import { useAppDispatch } from "../../redux/hooks"
import { fetchUserData } from "../../redux/slices/userSlice"
import DashBoard from "../DashBoard"
import { ContentWrapper, MainWrapper } from "./styled"

const Main = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserData())
  }, [])

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
