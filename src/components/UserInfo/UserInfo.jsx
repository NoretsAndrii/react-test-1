import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/usersDataSlice";
import css from "./UserInfo.module.css";

export default function UserInfo() {
  const user = useSelector(selectUserInfo);
  return (
    <div>
      <h3>User Info</h3>
      <div className={css.info}>
        <p>{`Вибран користувач ${user.firstName} ${user.lastName}`}</p>
        <p>{`Адреса ${user.address.streetAddress}`}</p>
        <p>{`Місто ${user.address.city}`}</p>
        <p>{`Штат ${user.address.state}`}</p>
        <p>{`Індекс ${user.address.zip}`}</p>
      </div>
    </div>
  );
}

// Выбран пользователь <b>Sue Corson</b>
// Описание:
// <textarea>
// et lacus magna dolor...
// </textarea>
// Адрес проживания: <b>9792 Mattis Ct</b>
// Город: <b>Waukesha</b>
// Провинция/штат: <b>WI</b>
// Индекс: <b>22178</b>
