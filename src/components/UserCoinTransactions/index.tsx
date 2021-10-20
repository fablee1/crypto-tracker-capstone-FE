import Card from "../Card"
import Table from "react-bootstrap/Table"
import { useAppSelector } from "../../redux/hooks"
import { selectUserTransactions } from "../../redux/slices/userSlice"
import UserCoinRow from "./UserCoinRow"
import NoCoinCover from "../../views/CoinPage/NoCoinCover"

const UserCoinTransactions = ({
  coinId,
  selectTrans,
  coinInPortfolio,
}: {
  coinId: string
  selectTrans: any
  coinInPortfolio: boolean
}) => {
  const userTransactions = useAppSelector(selectUserTransactions)

  return (
    <div className="mt-3">
      <Card height="350px">
        {coinInPortfolio ? (
          <Table className="text-white">
            <thead>
              <tr>
                <th>Type</th>
                <th className="text-end">Quantity</th>
                <th className="text-end">Fee</th>
                <th className="text-end">Date</th>
                <th className="text-center">Time</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {userTransactions
                .filter((t) => t.coin === coinId)
                .map((c) => (
                  <UserCoinRow data={c} select={selectTrans} />
                ))}
            </tbody>
          </Table>
        ) : (
          <NoCoinCover />
        )}
      </Card>
    </div>
  )
}

export default UserCoinTransactions
