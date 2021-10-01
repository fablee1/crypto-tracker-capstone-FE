import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { useState } from "react"
import BuySellForm from "./BuySellForm"
import TransferForm from "./TransferForm"

interface AddDataModalProps {
  show: boolean
  close: () => void
}

const AddDataModal = ({ show, close }: AddDataModalProps) => {
  const [type, setType] = useState("buy")

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Add Your Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ButtonGroup aria-label="Basic example">
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
          <BuySellForm />
        ) : type === "sell" ? (
          <BuySellForm sell />
        ) : (
          type === "transfer" && <TransferForm />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={close}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddDataModal
