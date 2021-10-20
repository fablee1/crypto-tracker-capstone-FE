import { FormEvent, useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { components } from "react-select"
import AsyncSelect from "react-select/async"
import backend from "../../backend"
import { AxiosResponse } from "axios"
import { useDispatch } from "react-redux"
import { addTransaction } from "../../redux/slices/userSlice"

const customStyles = {
  control: () => ({
    backgroundColor: "rgb(30 36 52)",
    alignItems: "center",
    borderColor: "hsl(0, 0%, 80%)",
    borderRadius: "4px",
    borderStyle: "solid",
    borderWidth: "1px",
    cursor: "default",
    display: "flex",
    justifyContent: "space-between",
    minHeight: "38px",
    outline: "0!important",
    transition: "all 100ms",
    color: "white",
  }),
}

const { Option } = components

const BuySellForm = ({ sell, close }: { sell?: boolean; close: any }) => {
  const dispatch = useDispatch()

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
      options.unshift({
        label: "Cash",
        value: "usd",
        symbol: "USD",
        image:
          "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/money-circle-green-3-512.png",
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

  const filterCoins = (query: string, showUsd: boolean) => {
    const coinsOpt = showUsd ? coinsOptions : coinsOptions.slice(1)

    return query.length >= 3
      ? coinsOpt.filter(
          (ex) =>
            ex.label.toLowerCase().includes(query.toLowerCase()) ||
            ex.symbol.toLowerCase().includes(query.toLowerCase())
        )
      : coinsOpt.slice(0, 30)
  }

  const loadOptionsCoins = (query: string) =>
    new Promise<{ name: string; id: string; image: string; symbol: string }[]>(
      (resolve) => {
        resolve(filterCoins(query, true) as any)
      }
    )

  const loadOptionsCoinsNoUsd = (query: string) =>
    new Promise<{ name: string; id: string; image: string; symbol: string }[]>(
      (resolve) => {
        resolve(filterCoins(query, false) as any)
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
    coin: "",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sell])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await backend.post("portfolio/add", transaction)
      if (data) {
        dispatch(addTransaction(data))
      }
    } catch (err) {
      console.log(err)
    }
    close()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Coin</Form.Label>
            <AsyncSelect
              styles={customStyles}
              cacheOptions
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "rgb(17 21 30)",
                  primary: "white",
                  neutral0: "rgb(30 36 52)",
                  neutral60: "white",
                  neutral70: "white",
                  neutral80: "white",
                  primary50: "white",
                  primary75: "white",
                },
              })}
              defaultOptions={coinsOptions.slice(1, 30)}
              loadOptions={loadOptionsCoinsNoUsd}
              components={{ Option: IconOptionCoins }}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  coin: (e as { label: string; value: string }).value,
                })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Exchange</Form.Label>
            <AsyncSelect
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "rgb(17 21 30)",
                  primary: "white",
                  neutral0: "rgb(30 36 52)",
                  neutral60: "white",
                  neutral70: "white",
                  neutral80: "white",
                  primary50: "white",
                  primary75: "white",
                },
              })}
              styles={customStyles}
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
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>{sell ? "Sold for" : "Bought with"}</Form.Label>
            <AsyncSelect
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "rgb(17 21 30)",
                  primary: "white",
                  neutral0: "rgb(30 36 52)",
                  neutral60: "white",
                  neutral70: "white",
                  neutral80: "white",
                  primary50: "white",
                  primary75: "white",
                },
              })}
              styles={customStyles}
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
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="number"
              step="any"
              style={{ backgroundColor: "rgb(30, 36, 52)", color: "white" }}
              min={0}
              value={transaction.total}
              onChange={(e) => setTransaction({ ...transaction, total: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              step="any"
              style={{ backgroundColor: "rgb(30 36 52)", color: "white" }}
              min={0}
              value={transaction.quantity}
              onChange={(e) =>
                setTransaction({ ...transaction, quantity: e.target.value })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Fee</Form.Label>
            <Form.Control
              type="number"
              step="any"
              style={{ backgroundColor: "rgb(30 36 52)", color: "white" }}
              min={0}
              value={transaction.fee}
              onChange={(e) => setTransaction({ ...transaction, fee: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              style={{ backgroundColor: "rgb(30 36 52)", color: "white" }}
              value={transaction.date}
              onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <div
        onClick={() => setMoreSettingsOpen(!moreSettingsOpen)}
        style={{ cursor: "pointer", textDecoration: "underline" }}>
        More Settings
      </div>
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
      <div className="d-flex w-100">
        <Button type="submit" variant="success" className="ms-auto">
          Add Transaction
        </Button>
      </div>
    </Form>
  )
}

export default BuySellForm
