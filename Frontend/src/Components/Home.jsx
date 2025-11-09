import { useEffect, useState } from "react"

function Home() {

  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      });
  }, [])

  return (
    <div>{
     userdata.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Position: {user.role}</p>
        </div>
     )) 
    }</div>
  )
}

export default Home