import { ICryptoCurrency } from "./crypto"
import { ITransaction } from "./transaction"

export interface IPortfolio {
  coinId: string
  amount: number
  averageBuyPrice: number
}

export interface IUser {
  _id: string
  name: string
  surname: string
  username: string
  email: string
  password?: string
  avatar?: string
  refreshToken?: string
  favourites: string[]
  portfolio: IPortfolio[]
  transactions: ITransaction[]
}

export interface IUserStore {
  me: IUser
  coins: {
    [key: string]: ICryptoCurrency
  }
}
