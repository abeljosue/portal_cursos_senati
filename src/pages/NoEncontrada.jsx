
import { Link, useLocation, useNavigate } from 'react-router';

export default function NoEncontrada() {
  const location = useLocation();
  const navigate = useNavigate();

  const ruta = location.pathname + location.search;

  return (
    <section className="no-encontrada">

      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p> Lo sentimos, la página que estás buscando no existe o la dirección es incorrecta. </p>
      <p> Ruta solicitada: <strong> {ruta}</strong> </p>

      <div className="acciones-404">
        <Link to="/"> Volver al inicio </Link>
        <Link to="/cursos"> Ver cursos disponibles </Link>
        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>

      </div>

    </section>
  );
}
