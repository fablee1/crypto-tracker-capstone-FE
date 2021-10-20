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

export const toggleFavourite = createAsyncThunk(
  "user/toggleFavourite",
  async (coinId: string) => {
    const { data } = await backend.post(`/crypto/favourites/${coinId}`)
    return { data, coinId }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updatePrices: (state, action) => {
      action.payload.forEach((update: { coin: string; price: number }) => {
        state.coins[update.coin].current_price = update.price
        state.coins[update.coin].last1hPrice?.shift()
        state.coins[update.coin].last1hPrice?.push(update.price)
      })
    },
    addTransaction: (state, action) => {
      if (action.payload.coinData !== null) {
        state.coins[action.payload.coinData.id] = action.payload.coinData
      }
      state.me.transactions.push(action.payload.trans[0])
      state.me.portfolio = action.payload.portfolio
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.me = action.payload.user
      const coins: any = {}
      action.payload.coins.forEach((coin) => (coins[coin.id] = coin))
      state.coins = { ...state.coins, ...coins }
    })
    builder.addCase(toggleFavourite.fulfilled, (state, action) => {
      if (action.payload.data === "OK") {
        state.me.favourites = state.me.favourites.filter(
          (id) => id !== action.payload.coinId
        )
      } else {
        state.coins[action.payload.coinId] = action.payload.data
        state.me.favourites.push(action.payload.coinId)
      }
    })
  },
})

export const selectUserData = (state: RootState) => state.user.me
export const selectUserCoins = (state: RootState) => state.user.coins
export const selectUserPortfolio = (state: RootState) => state.user.me.portfolio
export const selectUserFavourites = (state: RootState) => state.user.me.favourites
export const selectUserTransactions = (state: RootState) => state.user.me.transactions

export const { updatePrices, addTransaction } = userSlice.actions

export default userSlice.reducer
