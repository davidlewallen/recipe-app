declare export type Recipe = {
  created: string,
  imageURL: string,
  ingredients: Array<string>,
  instructions: Array<string>,
  title: string,
  totalTime: string,
  url: {
    hostname: string,
    href: string,
    link: string,
  },
  __v: number,
  _id: string,
}
