import { useEffect } from "react"
import NavBar from "../../components/NavBar"
import { useAppDispatch } from "../../redux/hooks"
import { fetchUserData, updatePrices } from "../../redux/slices/userSlice"
import DashBoard from "../DashBoard"
import { io } from "socket.io-client"
import { ContentWrapper, MainWrapper } from "./styled"

export const socket = io(process.env.REACT_APP_BE_URL_DEV!, { transports: ["websocket"] })

const Main = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserData())

    socket.on("newPrices", (prices) => {
      dispatch(updatePrices(prices))
    })
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
