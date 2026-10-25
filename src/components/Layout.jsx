import { Link, NavLink, Outlet } from "react-router";

const claseEnlace = ({ isActive }) =>
  isActive ? "enlace enlace-activo" : "enlace";

function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <nav aria-label="Navegación principal">
          <Link className="marca" to="/">
            Portal de Cursos
          </Link>

          <div className="menu-principal">
            <NavLink to="/" end className={claseEnlace}>
              Inicio
            </NavLink>
            <NavLink to="/cursos" className={claseEnlace}>
              Cursos
            </NavLink>
            <NavLink to="/matricula" className={claseEnlace}>
              Matrícula
            </NavLink>
            <NavLink to="/contacto" className={claseEnlace}>
              Contacto
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="app-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <small>Portal de Cursos</small>
      </footer>
    </div>
  );
}

export default Layout;
