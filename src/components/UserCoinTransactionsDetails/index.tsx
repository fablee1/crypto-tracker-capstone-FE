import Card from "../Card"
import { useAppSelector } from "../../redux/hooks"
import { selectUserTransactions } from "../../redux/slices/userSlice"

const UserCoinTransactionsDetails = ({ transId }: { transId: string | null }) => {
  const userTransactions = useAppSelector(selectUserTransactions)

  return (
    <div className="mt-3">
      <Card title="Transaction Details" height="350px">
        {transId ? <div>INFO</div> : <div>Please Select Transaction</div>}
      </Card>
    </div>
  )
}

export default UserCoinTransactionsDetails
