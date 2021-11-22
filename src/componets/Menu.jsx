import { NavLink } from "react-router-dom";

const Menu = () => {
    return(
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">                    
                  <NavLink to={'/'} className={(navData) => "nav-link" + (navData.isActive ? ' active' : '')}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item"> 
                    <NavLink to={'/users'} className={(navData) => "nav-link" + (navData.isActive ? ' active' : '')}>         
                        Users
                    </NavLink>
                </li>
              </ul>
            </div>
        </nav>
    )
}

export default Menu;