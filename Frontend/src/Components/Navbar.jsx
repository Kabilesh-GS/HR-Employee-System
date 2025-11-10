import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

function Navbar() {
  return ( 
    <div className={style.navBar}>
      <p><Link to="/">Home</Link></p>
      <p><Link to="/addUser">Add user</Link></p>
      <p><Link to="/onGoingProjects">Ongoing Projects</Link></p>
      <p><Link to="/settings">Settings</Link></p>
    </div>
  )
}

export default Navbar