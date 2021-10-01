import { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Select from "react-select"

const BuySellForm = ({ sell }: { sell?: boolean }) => {
  const exchangeOptions = [
    { label: "first", value: "1" },
    { label: "second", value: "2" },
  ]

  const forOptions = [
    { label: "first", value: "1" },
    { label: "second", value: "2" },
  ]

  const [transaction, setTransaction] = useState({
    type: sell ? "sell" : "buy",
    exchange: exchangeOptions[0].value,
    for: forOptions[0].value,
    total: "0",
    quantity: "0",
    fee: "0",
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toLocaleTimeString().slice(0, 5),
    notes: "",
  })

  useEffect(() => {
    setTransaction({ ...transaction, type: sell ? "sell" : "buy" })
  }, [sell])

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Exchange</Form.Label>
        <Select
          options={exchangeOptions}
          onChange={(e) =>
            setTransaction({
              ...transaction,
              exchange: (e as { label: string; value: string }).value,
            })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{sell ? "Sold for" : "Bought with"}</Form.Label>
        <Select
          options={forOptions}
          onChange={(e) =>
            setTransaction({
              ...transaction,
              for: (e as { label: string; value: string }).value,
            })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Total</Form.Label>
        <Form.Control
          type="number"
          min={0}
          value={transaction.total}
          onChange={(e) => setTransaction({ ...transaction, total: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          min={0}
          value={transaction.quantity}
          onChange={(e) => setTransaction({ ...transaction, quantity: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Fee</Form.Label>
        <Form.Control
          type="number"
          min={0}
          value={transaction.fee}
          onChange={(e) => setTransaction({ ...transaction, fee: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={transaction.date}
          onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          value={transaction.time}
          onChange={(e) => setTransaction({ ...transaction, time: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          value={transaction.notes}
          onChange={(e) => setTransaction({ ...transaction, notes: e.target.value })}
        />
      </Form.Group>
    </Form>
  )
}

export default BuySellForm
