
import { useState } from 'react';

const validar = (valores) => {
  const errores = {};

  if (!valores.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio';
  } else if (valores.nombre.trim().length < 3) {
    errores.nombre = 'Escribe al menos 3 letras';
  }

  if (!valores.correo.trim()) {
    errores.correo = 'El correo es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.correo)) {
    errores.correo = 'Ingresa un correo válido';
  }

  if (!valores.mensaje.trim()) {
    errores.mensaje = 'El mensaje es obligatorio';
  } else if (valores.mensaje.trim().length < 10) {
    errores.mensaje = 'Escribe al menos 10 caracteres';
  }

  return errores;
};

export default function Contacto() {
  const [valores, setValores] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  const [tocados, setTocados] = useState({});
  const [exito, setExito] = useState(false);

  const errores = validar(valores);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setValores((actual) => ({
      ...actual,
      [name]: value
    }));

    setExito(false);
  };

  const manejarBlur = (e) => {
    const { name } = e.target;

    setTocados((actual) => ({
      ...actual,
      [name]: true
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    setTocados({
      nombre: true,
      correo: true,
      mensaje: true
    });

    if (Object.keys(errores).length > 0) {
      return;
    }

    setExito(true);

    setValores({
      nombre: '',
      correo: '',
      mensaje: ''
    });

    setTocados({});
  };

  return (
    <section className="contacto">
      <h1>Contáctanos</h1>

      <p>
        ¿Tienes alguna consulta sobre nuestros cursos?
        Completa el siguiente formulario.
      </p>

      {exito && (
        <p className="mensaje-exito" role="status">
          Formulario validado correctamente.
          Esta es una demostración, no se envió al servidor.
        </p>
      )}

      <form onSubmit={manejarEnvio} noValidate>

        <div className="campo">
          <label htmlFor="nombre">
            Nombre completo
          </label>

          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            value={valores.nombre}
            onChange={manejarCambio}
            onBlur={manejarBlur}
          />

          {tocados.nombre && errores.nombre && (
            <small className="error" role="alert">
              {errores.nombre}
            </small>
          )}
        </div>

        <div className="campo">
          <label htmlFor="correo">
            Correo electrónico
          </label>

          <input
            id="correo"
            type="email"
            name="correo"
            placeholder="ejemplo@correo.com"
            value={valores.correo}
            onChange={manejarCambio}
            onBlur={manejarBlur}
          />

          {tocados.correo && errores.correo && (
            <small className="error" role="alert">
              {errores.correo}
            </small>
          )}
        </div>

        <div className="campo">
          <label htmlFor="mensaje">
            Mensaje
          </label>

          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            maxLength="500"
            placeholder="Escribe tu consulta..."
            value={valores.mensaje}
            onChange={manejarCambio}
            onBlur={manejarBlur}
          />

          <small>
            {valores.mensaje.length}/500 caracteres
          </small>

          {tocados.mensaje && errores.mensaje && (
            <small className="error" role="alert">
              {errores.mensaje}
            </small>
          )}
        </div>

        <button type="submit"> Enviar consulta </button>

      </form>
    </section>
  );
}
