import './style.css';
import AlumnoUI from './AlumnosUI.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Registro de Alumnos</h1>
    <div id="alumnosContainer"></div>
  </div>
`;

const container = document.querySelector('#alumnosContainer');
const ui = new AlumnoUI(container);
ui.renderTables();
