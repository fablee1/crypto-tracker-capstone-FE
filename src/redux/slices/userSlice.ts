import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import backend from "../../backend"
import { ICryptoCurrency } from "../../typings/crypto"
import { IUserStore, IUser } from "../../typings/users"
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
  return { user: user.data, coins: coins.data }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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

export const {} = userSlice.actions

export default userSlice.reducer
