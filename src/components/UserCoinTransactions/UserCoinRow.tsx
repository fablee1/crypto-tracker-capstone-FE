import styled from "styled-components"
import { ITransaction } from "../../typings/transaction"

interface UserCoinRowProps {
  data: ITransaction
  select: any
}

const MyTr = styled.tr`
  &:hover {
    background-color: #8080801a;
    cursor: pointer;
  }
`

const UserCoinRow = ({ data, select }: UserCoinRowProps) => {
  return (
    <MyTr onClick={() => select(data._id)}>
      <td>{data.type.toUpperCase()}</td>
      <td className="text-end">{data.quantity?.toLocaleString()}</td>
      <td className="text-end">{data.fee?.toLocaleString()}</td>
      <td className="text-end">{new Date(data.date).toLocaleDateString()}</td>
      <td className="text-center">{data.time}</td>
      <td className="text-end">
        <button
          style={{ backgroundColor: "transparent", color: "white", border: "none" }}>
          Details
        </button>
      </td>
    </MyTr>
  )
}

export default UserCoinRow
