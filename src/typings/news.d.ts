export interface INews {
  id: string
  guid: string
  published_on: number
  imageurl: string
  title: string
  url: string
  source: string
  body: string
  tags: string
  categories: string
  upvotes: string
  downvotes: string
  lang: string
  source_info: {
    name: string
    lang: string
    img: string
  }
}
