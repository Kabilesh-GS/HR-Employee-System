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
    <div>
      <h2 className={style.headingWelcome}>Welcome!</h2>
      <div className={style.homeContainer}>{
      userdata.map((user) => (
          <div key={user.user_id} onClick={() => displaydetail(user)} className={style.userCard}>
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Position:</strong> {user.role}</p>
          </div>
      )) 
      }</div>
    </div>
  )
}

export default Home