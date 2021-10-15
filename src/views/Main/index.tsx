import { useEffect } from "react"
import NavBar from "../../components/NavBar"
import { useAppDispatch } from "../../redux/hooks"
import { fetchUserData, updatePrices } from "../../redux/slices/userSlice"
import DashBoard from "../DashBoard"
import AllCoins from "../AllCoins"
import { io } from "socket.io-client"
import { ContentWrapper, MainWrapper } from "./styled"
import { Route, Switch } from "react-router"
import CoinPage from "../CoinPage"

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
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route exact path="/cryptos" component={AllCoins} />
          <Route path="/coins/:id" component={CoinPage} />
        </Switch>
      </ContentWrapper>
    </MainWrapper>
  )
}

export default Main
