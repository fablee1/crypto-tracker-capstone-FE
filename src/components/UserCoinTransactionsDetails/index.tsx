import Card from "../Card"
import { useAppSelector } from "../../redux/hooks"
import { selectUserTransactions } from "../../redux/slices/userSlice"
import NoCoinCover from "../../views/CoinPage/NoCoinCover"

const UserCoinTransactionsDetails = ({
  transId,
  coinInPortfolio,
}: {
  transId: string | null
  coinInPortfolio: boolean
}) => {
  const userTransactions = useAppSelector(selectUserTransactions)

  return (
    <div className="mt-3">
      <Card title="Transaction Details" height="350px">
        {coinInPortfolio ? (
          transId ? (
            <div>INFO</div>
          ) : (
            <div>Please Select Transaction</div>
          )
        ) : (
          <NoCoinCover />
        )}
      </Card>
    </div>
  )
}

export default UserCoinTransactionsDetails
