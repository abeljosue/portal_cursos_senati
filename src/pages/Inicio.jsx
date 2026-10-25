import { Link } from "react-router";
import CursoCard from "../components/CursoCard.jsx";
import cursos from "../data/cursos.js";
import "./Inicio.css";

const cursosDestacados = cursos.slice(0, 3);

function Inicio() {
  return (
    <div className="inicio-page">
      <section className="inicio-hero" aria-labelledby="inicio-titulo">
        <div className="inicio-hero__content">
          <p className="inicio-eyebrow">Formación técnica para tu próximo paso</p>
          <h1 id="inicio-titulo">
            Aprende hoy. <span>Avanza mañana.</span>
          </h1>
          <p className="inicio-hero__description">
            Encuentra cursos prácticos, desarrolla nuevas habilidades y prepárate
            para alcanzar tus objetivos profesionales.
          </p>

          <div className="inicio-actions">
            <Link className="inicio-button inicio-button--primary" to="/cursos">
              Explorar cursos
            </Link>
            <Link className="inicio-button inicio-button--secondary" to="/matricula">
              Iniciar matrícula
            </Link>
          </div>

          <dl className="inicio-stats" aria-label="Resumen del portal">
            <div>
              <dt>6</dt>
              <dd>Cursos iniciales</dd>
            </div>
            <div>
              <dt>3</dt>
              <dd>Modalidades</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>Enfoque práctico</dd>
            </div>
          </dl>
        </div>

        <div className="inicio-hero__visual" aria-hidden="true">
          <div className="inicio-visual-card">
            <span className="inicio-visual-card__label">Tu siguiente habilidad</span>
            <strong>Empieza con un curso</strong>
            <div className="inicio-progress">
              <span />
            </div>
            <small>Aprendizaje paso a paso</small>
          </div>
          <span className="inicio-visual-orb inicio-visual-orb--one" />
          <span className="inicio-visual-orb inicio-visual-orb--two" />
        </div>
      </section>

      <section className="inicio-benefits" aria-labelledby="beneficios-titulo">
        <div className="inicio-section-heading">
          <p className="inicio-eyebrow">Una experiencia simple</p>
          <h2 id="beneficios-titulo">Todo lo que necesitas para comenzar</h2>
        </div>

        <div className="inicio-benefits__grid">
          <article className="inicio-benefit-card">
            <span className="inicio-benefit-card__number">01</span>
            <h3>Elige tu camino</h3>
            <p>Explora el catálogo y encuentra una formación alineada a tus metas.</p>
          </article>
          <article className="inicio-benefit-card">
            <span className="inicio-benefit-card__number">02</span>
            <h3>Conoce cada curso</h3>
            <p>Revisa el temario, las horas y la modalidad antes de decidir.</p>
          </article>
          <article className="inicio-benefit-card">
            <span className="inicio-benefit-card__number">03</span>
            <h3>Matricúlate en línea</h3>
            <p>Completa tus datos y da el siguiente paso de forma rápida y clara.</p>
          </article>
        </div>
      </section>

      <section className="inicio-featured" aria-labelledby="destacados-titulo">
        <div className="inicio-section-heading inicio-section-heading--row">
          <div>
            <p className="inicio-eyebrow">Empieza por aquí</p>
            <h2 id="destacados-titulo">Cursos destacados</h2>
          </div>
          <Link className="inicio-text-link" to="/cursos">
            Ver todos los cursos
          </Link>
        </div>

        <div className="inicio-course-grid">
          {cursosDestacados.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
      </section>

      <section className="inicio-contact-cta" aria-labelledby="contacto-titulo">
        <div>
          <p className="inicio-eyebrow">¿Tienes alguna pregunta?</p>
          <h2 id="contacto-titulo">Estamos aquí para orientarte.</h2>
        </div>
        <Link className="inicio-button inicio-button--light" to="/contacto">
          Ir a contacto
        </Link>
      </section>
    </div>
  );
}

export default Inicio;
