import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/filtersSlice";

export default function SearchForm() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.search.value.trim();
    dispatch(setFilter(value));
    form.reset();
  };
  return (
    <form onSubmit={handleSearch}>
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </form>
  );
}
