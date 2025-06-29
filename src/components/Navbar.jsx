import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar px-5 navbar-expand-lg bg-primary navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-light" to="/">Intern House</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <NavLink className="text-decoration-none nav-link" to="/">Job Postings</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="text-decoration-none nav-link" to="/post_job">Post a Job</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}
