export default class AlumnoUI {
  constructor(container) {
    this.container = container;
    this.carreras = [];
  }

  async fetchCarreras() {
    try {
      const res = await fetch("http://localhost:3000/carreras");
      this.carreras = await res.json();
    } catch (err) {
      console.error("Error cargando carreras:", err);
      this.carreras = [];
    }
  }

  async fetchAlumnos() {
    try {
      const res = await fetch("http://localhost:3000/alumnos");
      return await res.json();
    } catch (err) {
      console.error("Error cargando alumnos:", err);
      return [];
    }
  }

  async renderTables() {
    await this.fetchCarreras();
    const alumnos = await this.fetchAlumnos();

    const alumnosHTML = alumnos.map(a => `
      <tr class="border-b">
        <td class="px-4 py-2">${a.nombre}</td>
        <td class="px-4 py-2">${a.edad}</td>
        <td class="px-4 py-2 flex gap-2">
          <button class="bg-yellow-500 text-white px-2 rounded modificar" data-id="${a.id}">Modificar</button>
          <button class="bg-red-500 text-white px-2 rounded eliminar" data-id="${a.id}">Eliminar</button>
        </td>
      </tr>
    `).join('');

    const carrerasHTML = this.carreras.map(c => `
      <tr class="border-b">
        <td class="px-4 py-2">${c.nombre}</td>
      </tr>
    `).join('');

    this.container.innerHTML = `
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Alumnos Registrados</h2>
        <table class="min-w-full bg-white rounded shadow">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2">Nombre</th>
              <th class="px-4 py-2">Edad</th>
              <th class="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>${alumnosHTML}</tbody>
        </table>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Carreras Disponibles</h2>
        <table class="min-w-full bg-white rounded shadow">
          <thead>
            <tr class="bg-gray-200"><th class="px-4 py-2">Carrera</th></tr>
          </thead>
          <tbody>${carrerasHTML}</tbody>
        </table>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Registrar Alumno</h2>
        <form id="formAlumno" class="flex flex-col gap-2">
          <input type="text" id="nombre" placeholder="Nombre" class="p-2 border rounded">
          <input type="number" id="edad" placeholder="Edad" class="p-2 border rounded">
          <select id="carrera" class="p-2 border rounded">
            <option value="">Selecciona una carrera</option>
            ${this.carreras.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
          </select>
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800">Registrar</button>
        </form>
      </div>
    `;

    this.addEventListeners();
  }

  addEventListeners() {
    // EliminarAlumno
    this.container.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", async () => {
        await fetch(`http://localhost:3000/alumnos/${btn.dataset.id}`, { method: "DELETE" });
        this.renderTables();
      });
    });

    // ModificarAlumno
    this.container.querySelectorAll(".modificar").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const nombre = prompt("Nuevo nombre:");
        const edad = parseInt(prompt("Nueva edad:"), 10);
        const carrera_id = parseInt(prompt("ID de carrera:"), 10);
        if (nombre && edad && carrera_id) {
          await fetch(`http://localhost:3000/alumnos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, edad, carrera_id })
          });
          this.renderTables();
        }
      });
    });

    // RegistroAlumno
    const form = this.container.querySelector("#formAlumno");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const nombre = form.nombre.value;
      const edad = parseInt(form.edad.value, 10);
      const carrera_id = parseInt(form.carrera.value, 10);
      if (nombre && edad && carrera_id) {
        await fetch("http://localhost:3000/alumnos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, edad, carrera_id })
        });
        form.reset();
        this.renderTables();
      }
    });
  }
}
