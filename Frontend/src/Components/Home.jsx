import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import style from './Home.module.css';

function Home() {

  const [userdata, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      });
  }, [])

  const displaydetail = (user) => {
    navigate(`/user/${user.user_id}`);
  }

  return (
    <div className={style.homeContainer}>{
     userdata.map((user) => (
        <div key={user.user_id} onClick={() => displaydetail(user)} className={style.userCard}>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Position: {user.role}</p>
        </div>
     )) 
    }</div>
  )
}

export default Home