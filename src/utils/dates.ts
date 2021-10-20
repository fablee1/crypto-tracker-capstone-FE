export const getDayMonthString = (d: string) => {
  const date1 = new Date(d)

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  if (!date1.getMonth()) {
    console.log(date1)
  }

  return `${months[date1.getMonth()]}`
}
