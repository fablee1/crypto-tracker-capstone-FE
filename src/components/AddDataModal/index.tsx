import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { useState } from "react"
import BuySellForm from "./BuySellForm"
import TransferForm from "./TransferForm"
import { MyModalBody } from "./styled"

interface AddDataModalProps {
  show: boolean
  close: () => void
}

const AddDataModal = ({ show, close }: AddDataModalProps) => {
  const [type, setType] = useState("buy")

  return (
    <Modal show={show} onHide={close} dialogClassName="data-add-modal">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "rgb(17, 21, 30)", color: "white" }}>
        <Modal.Title>Add Your Data</Modal.Title>
      </Modal.Header>
      <MyModalBody>
        <ButtonGroup className="d-flex justify-content-center mb-4">
          <Button variant="success" onClick={() => setType("buy")}>
            Buy
          </Button>
          <Button variant="danger" onClick={() => setType("sell")}>
            Sell
          </Button>
          <Button variant="warning" onClick={() => setType("transfer")}>
            Transfer
          </Button>
        </ButtonGroup>
        {type === "buy" ? (
          <BuySellForm close={close} />
        ) : type === "sell" ? (
          <BuySellForm sell close={close} />
        ) : (
          type === "transfer" && <TransferForm />
        )}
      </MyModalBody>
    </Modal>
  )
}

export default AddDataModal
