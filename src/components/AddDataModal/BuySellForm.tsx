import { FormEvent, useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { components } from "react-select"
import AsyncSelect from "react-select/async"
import backend from "../../backend"
import { AxiosResponse } from "axios"

const { Option } = components

const BuySellForm = ({ sell }: { sell?: boolean }) => {
  const [exchangeOptions, setExchangeOptions] = useState<
    { label: string; value: string; image: string }[]
  >([])

  const [coinsOptions, setCoinsOptions] = useState<
    { label: string; value: string; image: string; symbol: string }[]
  >([])

  const [moreSettingsOpen, setMoreSettingsOpen] = useState(false)

  useEffect(() => {
    const getExchanges = async () => {
      const { data }: AxiosResponse<{ name: string; id: string; image: string }[]> =
        await backend.get("exchanges")
      const options = data.map((e) => {
        return { label: e.name, value: e.id, image: e.image }
      })
      setExchangeOptions(options)
    }
    const getCoins = async () => {
      const {
        data,
      }: AxiosResponse<
        {
          name: string
          id: string
          image: string
          market_cap_rank: number
          symbol: string
        }[]
      > = await backend.get("crypto/all")
      const options = data.map((e) => {
        return { label: e.name, value: e.id, image: e.image, symbol: e.symbol }
      })
      setCoinsOptions(options)
    }
    getExchanges()
    getCoins()
  }, [])

  const filterExchanges = (query: string) => {
    return query.length >= 3
      ? exchangeOptions.filter((ex) =>
          ex.label.toLowerCase().includes(query.toLowerCase())
        )
      : exchangeOptions.slice(0, 30)
  }

  const loadOptionsExchanges = (query: string) =>
    new Promise<{ name: string; id: string; image: string }[]>((resolve) => {
      resolve(filterExchanges(query) as any)
    })

  const filterCoins = (query: string) => {
    return query.length >= 3
      ? coinsOptions.filter(
          (ex) =>
            ex.label.toLowerCase().includes(query.toLowerCase()) ||
            ex.symbol.toLowerCase().includes(query.toLowerCase())
        )
      : coinsOptions.slice(0, 30)
  }

  const loadOptionsCoins = (query: string) =>
    new Promise<{ name: string; id: string; image: string; symbol: string }[]>(
      (resolve) => {
        resolve(filterCoins(query) as any)
      }
    )

  const IconOptionExchange = (props: any) => (
    <Option {...props}>
      <img src={props.data.image} style={{ width: 18 }} alt={props.data.label} />
      {props.data.label}
    </Option>
  )

  const IconOptionCoins = (props: any) => (
    <Option {...props}>
      <img src={props.data.image} style={{ width: 18 }} alt={props.data.label} />
      {`${props.data.symbol.toUpperCase()} - ${props.data.label}`}
    </Option>
  )

  const [transaction, setTransaction] = useState({
    type: sell ? "sell" : "buy",
    exchange: "",
    for: "",
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await backend.post("portfolio/add", transaction)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Exchange</Form.Label>
        <AsyncSelect
          cacheOptions
          defaultOptions={exchangeOptions.slice(0, 30)}
          loadOptions={loadOptionsExchanges}
          components={{ Option: IconOptionExchange }}
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
        <AsyncSelect
          cacheOptions
          defaultOptions={coinsOptions.slice(0, 30)}
          loadOptions={loadOptionsCoins}
          components={{ Option: IconOptionCoins }}
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
      <div onClick={() => setMoreSettingsOpen(!moreSettingsOpen)}>More Settings</div>
      <div className={moreSettingsOpen ? "" : "d-none"}>
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
      </div>
      <Button type="submit">Save</Button>
    </Form>
  )
}

export default BuySellForm
