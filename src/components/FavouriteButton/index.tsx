import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectUserFavourites, toggleFavourite } from "../../redux/slices/userSlice"

interface FavouriteButtonProps {
  coinId: string
  size?: string
}

const FavouriteButton = ({ coinId, size }: FavouriteButtonProps) => {
  const userFavourites = useAppSelector(selectUserFavourites)
  const dispatch = useAppDispatch()

  const handleClick = async () => {
    dispatch(toggleFavourite(coinId))
  }

  return (
    <div onClick={handleClick}>
      {userFavourites.includes(coinId) ? (
        <AiFillStar size={size} />
      ) : (
        <AiOutlineStar size={size} />
      )}
    </div>
  )
}

export default FavouriteButton
