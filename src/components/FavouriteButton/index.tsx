import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectUserFavourites, toggleFavourite } from "../../redux/slices/userSlice"
import { FavBtnWrapper } from "./styled"

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
    <FavBtnWrapper onClick={handleClick}>
      {userFavourites.includes(coinId) ? (
        <AiFillStar size={size} fill="rgb(236, 178, 90)" />
      ) : (
        <AiOutlineStar size={size} />
      )}
    </FavBtnWrapper>
  )
}

export default FavouriteButton
