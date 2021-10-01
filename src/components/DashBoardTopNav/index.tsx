import { AddDataBtn, TopNav } from "./styled"
import { AiFillPlusCircle } from "react-icons/ai"
import { useState } from "react"
import AddDataModal from "../AddDataModal"

const DashBoardTopNav = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <TopNav>
      <AddDataBtn className="ms-auto d-flex align-items-center" onClick={handleShow}>
        <AiFillPlusCircle size="1.2em" className="me-1" />
        <div>Add your data</div>
      </AddDataBtn>
      <AddDataModal show={show} close={handleClose} />
    </TopNav>
  )
}

export default DashBoardTopNav
