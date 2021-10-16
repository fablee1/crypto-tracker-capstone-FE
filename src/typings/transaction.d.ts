export interface ITransaction {
  _id: string
  type: string
  coin: string
  from?: string
  to?: string
  exchange?: string
  for?: string
  total?: number
  quantity?: number
  fee?: number
  date: Date
  time: string
  notes: string
}
