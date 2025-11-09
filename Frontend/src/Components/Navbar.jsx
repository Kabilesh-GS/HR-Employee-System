import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

function Navbar() {
  return ( 
    <div className={style.navBar}>
      <p><Link to="/">home</Link></p>
      <p><Link to="/settings">settings</Link></p>
    </div>
  )
}

export default Navbar