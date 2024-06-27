import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

export default function BottonUpOrDown({ isSorted, handleClick }) {
  return (
    <button onClick={handleClick}>
      {isSorted ? <FaAngleDown /> : <FaAngleUp />}
    </button>
  );
}
