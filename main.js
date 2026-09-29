
// 1. FILTRO INTERACTIVO DEL MENÚ

const botonesFiltro = document.querySelectorAll('.btn-filtro');
const platillos = document.querySelectorAll('.dish-card');

botonesFiltro.forEach(boton => {
  boton.addEventListener('click', () => {
    const categoriaSeleccionada = boton.dataset.categoria;

    platillos.forEach(platillo => {
      const categoriaPlatillo = platillo.dataset.categoria;

      // Si selecciona "todos" o coincide la categoría, se muestra
      if (categoriaSeleccionada === 'todos' || categoriaPlatillo === categoriaSeleccionada) {
        platillo.style.display = 'flex';
      } else {
        platillo.style.display = 'none';
      }
    });
  });
});


// 2. FORMULARIO DE RESERVA CON LOCALSTORAGE

const formulario = document.querySelector('#reserva form');

// Cargar reserva previa al abrir o recargar la página
cargarReservaGuardada();

formulario.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const nombre = document.querySelector('#nombre').value.trim();
  const telefono = document.querySelector('#telefono').value.trim();
  const fechaInput = document.querySelector('#fecha').value;

  limpiarMensajes();

  // Validaciones
  const fechaSeleccionada = new Date(fechaInput);
  const fechaActual = new Date();

  if (fechaSeleccionada < fechaActual) {
    mostrarMensaje("⚠️ Por favor selecciona una fecha y hora futura.", "#ff4d4d");
    return;
  }

  if (telefono.length < 7) {
    mostrarMensaje("⚠️ Ingresa un número de teléfono válido (mínimo 7 dígitos).", "#ff4d4d");
    return;
  }

  // Guardar en memoria local (localStorage)
  const datosReserva = { nombre, fecha: fechaInput, telefono };
  localStorage.setItem('reservaRockburger', JSON.stringify(datosReserva));

  // Confirmación
  mostrarMensaje(`🤘 ¡Reserva Confirmada, ${nombre}! Te esperamos el ${fechaInput}.`, "#b9df11");
  formulario.reset();
});

// Función para recuperar la reserva del almacenamiento del navegador
function cargarReservaGuardada() {
  const reservaGuardada = localStorage.getItem('reservaRockburger');
  
  if (reservaGuardada) {
    const datos = JSON.parse(reservaGuardada);
    mostrarMensaje(`📌 Tienes una reserva activa registrada a nombre de ${datos.nombre} para el ${datos.fecha}.`, "#b9df11");
  }
}

// Funciones auxiliares
function mostrarMensaje(texto, color) {
  const mensaje = document.createElement('div');
  mensaje.className = 'mensaje-confirmacion';
  mensaje.innerHTML = `
    <p style="color: ${color}; font-weight: bold; margin-top: 1rem; text-align: center;">
      ${texto}
    </p>
  `;
  formulario.appendChild(mensaje);
}

function limpiarMensajes() {
  const mensajeAnterior = document.querySelector('.mensaje-confirmacion');
  if (mensajeAnterior) {
    mensajeAnterior.remove();
  }
}