import { AddDataBtn, TopNav } from "./styled"
import { AiFillPlusCircle } from "react-icons/ai"

const DashBoardTopNav = () => {
  return (
    <TopNav>
      <AddDataBtn className="ms-auto d-flex align-items-center">
        <AiFillPlusCircle size="1.2em" className="me-1" />
        <div>Add your data</div>
      </AddDataBtn>
    </TopNav>
  )
}

export default DashBoardTopNav
