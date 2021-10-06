import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import backend from "../../backend"
import { ICryptoCurrency } from "../../typings/crypto"
import { IUserStore, IUser } from "../../typings/users"
import { socket } from "../../views/Main"
import { RootState } from "../store"

const initialState: IUserStore = {
  me: {
    _id: "",
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    refreshToken: "",
    favourites: [],
    portfolio: [],
    transactions: [],
  },
  coins: {},
}

export const fetchUserData = createAsyncThunk("user/fetchUserData", async () => {
  const user: AxiosResponse<IUser> = await backend.get("/users/me")
  const coins: AxiosResponse<ICryptoCurrency[]> = await backend.get("/crypto/myCoins")
  socket.emit(
    "listenCoinUpdates",
    coins.data.map((c) => c.id)
  )
  return { user: user.data, coins: coins.data }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updatePrices: (state, action) => {
      action.payload.forEach((update: { coin: string; price: number }) => {
        console.log(update)
        console.log(state.coins[update.coin])
        state.coins[update.coin].current_price = update.price
        state.coins[update.coin].last1hPrice?.shift()
        state.coins[update.coin].last1hPrice?.push(update.price)
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.me = action.payload.user
      const coins: any = {}
      action.payload.coins.forEach((coin) => (coins[coin.id] = coin))
      state.coins = { ...state.coins, ...coins }
    })
  },
})

export const selectUserData = (state: RootState) => state.user.me
export const selectUserCoins = (state: RootState) => state.user.coins
export const selectUserPortfolio = (state: RootState) => state.user.me.portfolio
export const selectUserFavourites = (state: RootState) => state.user.me.favourites

export const { updatePrices } = userSlice.actions

export default userSlice.reducer
