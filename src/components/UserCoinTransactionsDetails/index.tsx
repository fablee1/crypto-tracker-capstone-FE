import Card from "../Card"
import NoCoinCover from "../../views/CoinPage/NoCoinCover"

const UserCoinTransactionsDetails = ({
  transId,
  coinInPortfolio,
}: {
  transId: string | null
  coinInPortfolio: boolean
}) => {
  return (
    <div className="mt-3">
      <Card title="Transaction Details" height="350px">
        {coinInPortfolio ? (
          transId ? (
            <div>INFO</div>
          ) : (
            <div className="h-100 d-flex justify-content-center align-items-center text-white fs-3">
              Please Select Transaction
            </div>
          )
        ) : (
          <NoCoinCover />
        )}
      </Card>
    </div>
  )
}

export default UserCoinTransactionsDetails
