// pages/Medicine/medicineHandler.ts

interface Nino {
    id: number;
    nombre: string;
    apellidos: string;
}

interface Medicamento {
    id: number;
    nombre: string;
    descripcion: string;
}

type EstadoEvento = "PENDIENTE" | "TOMADO";

interface EventoMedicacion {
    idEvento: number;
    nino: Nino;
    medicamento: Medicamento;
    fechaProgramada: string;
    horaProgramada: string;
    fechaTomada: string | null;
    horaTomada: string | null;
    estado: EstadoEvento;
}

/************************************
 * HARD-CODED DATA
 ************************************/
const NINOS: Nino[] = [
    { id: 1, nombre: "Lucas", apellidos: "Martínez Ruiz" },
    { id: 2, nombre: "Ana", apellidos: "Gómez Pérez" },
    { id: 3, nombre: "Dídac", apellidos: "Soler Bosch" },
    { id: 4, nombre: "Sara", apellidos: "López Vidal" },
    { id: 5, nombre: "Pau", apellidos: "Serra Lloret" },
    { id: 6, nombre: "Julia", apellidos: "Casas Claramunt" },
    { id: 7, nombre: "Eric", apellidos: "Martí Llopis" },
    { id: 8, nombre: "Claudia", apellidos: "Ribas Coll" },
    { id: 9, nombre: "Marc", apellidos: "Ferré Dalmau" },
    { id: 10, nombre: "Carla", apellidos: "Batlle Arnau" }
];

const MEDICAMENTOS: Medicamento[] = [
    { id: 1, nombre: "Paracetamol", descripcion: "Analgésico" },
    { id: 2, nombre: "Ventolín", descripcion: "Broncodilatador" },
    { id: 3, nombre: "Amoxicilina", descripcion: "Antibiótico" },
    { id: 4, nombre: "Ibuprofeno", descripcion: "Anti-inflamatorio" },
    { id: 5, nombre: "Clonazepam", descripcion: "Anticonvulsivo" },
    { id: 6, nombre: "Loratadina", descripcion: "Antihistamínico" },
    { id: 7, nombre: "Omeprazol", descripcion: "Protector gástrico" },
    { id: 8, nombre: "Salbutamol", descripcion: "Inhalador" },
    { id: 9, nombre: "Diazepam", descripcion: "Tratamiento de crisis" },
    { id: 10, nombre: "Fluoxetine", descripcion: "Regulador del ánimo" }
];

let EVENTOS: EventoMedicacion[] = [
    { idEvento: 1, nino: NINOS[0], medicamento: MEDICAMENTOS[0], fechaProgramada: "2025-02-10", horaProgramada: "10:00", fechaTomada: null, horaTomada: null, estado: "PENDIENTE" },
    { idEvento: 2, nino: NINOS[1], medicamento: MEDICAMENTOS[2], fechaProgramada: "2025-02-10", horaProgramada: "08:00", fechaTomada: "2025-02-10", horaTomada: "08:01", estado: "TOMADO" },
    { idEvento: 3, nino: NINOS[2], medicamento: MEDICAMENTOS[1], fechaProgramada: "2025-02-10", horaProgramada: "15:30", fechaTomada: null, horaTomada: null, estado: "PENDIENTE" },
    { idEvento: 4, nino: NINOS[3], medicamento: MEDICAMENTOS[5], fechaProgramada: "2025-02-11", horaProgramada: "09:00", fechaTomada: null, horaTomada: null, estado: "PENDIENTE" },
    { idEvento: 5, nino: NINOS[4], medicamento: MEDICAMENTOS[4], fechaProgramada: "2025-02-11", horaProgramada: "12:00", fechaTomada: "2025-02-11", horaTomada: "12:03", estado: "TOMADO" },
    { idEvento: 6, nino: NINOS[5], medicamento: MEDICAMENTOS[3], fechaProgramada: "2025-02-10", horaProgramada: "18:00", fechaTomada: null, horaTomada: null, estado: "PENDIENTE" },
    { idEvento: 7, nino: NINOS[6], medicamento: MEDICAMENTOS[7], fechaProgramada: "2025-02-10", horaProgramada: "20:00", fechaTomada: "2025-02-10", horaTomada: "20:01", estado: "TOMADO" },
    { idEvento: 8, nino: NINOS[7], medicamento: MEDICAMENTOS[8], fechaProgramada: "2025-02-11", horaProgramada: "07:30", fechaTomada: null, horaTomada: null, estado: "PENDIENTE" },
    { idEvento: 9, nino: NINOS[8], medicamento: MEDICAMENTOS[6], fechaProgramada: "2025-02-12", horaProgramada: "09:15", fechaTomada: null, horaTomada: null, estado: "PENDIENTE" },
    { idEvento: 10, nino: NINOS[9], medicamento: MEDICAMENTOS[9], fechaProgramada: "2025-02-10", horaProgramada: "06:00", fechaTomada: "2025-02-10", horaTomada: "06:02", estado: "TOMADO" }
];

/************************************
 * RENDER PRINCIPAL
 ************************************/
export function attachMedicineHandlers(): void {
    renderNinos();
    renderMedicamentos();
    renderEventos();
    setupEventClick();
}

/************************************
 * RENDER FUNCTIONS
 ************************************/
function renderNinos() {
    const tbody = document.getElementById("med-ninos-body")!;
    tbody.innerHTML = NINOS.map(n => `
        <tr><td>${n.id}</td><td>${n.nombre}</td><td>${n.apellidos}</td></tr>
    `).join("");
}

function renderMedicamentos() {
    const tbody = document.getElementById("med-meds-body")!;
    tbody.innerHTML = MEDICAMENTOS.map(m => `
        <tr><td>${m.id}</td><td>${m.nombre}</td><td>${m.descripcion}</td></tr>
    `).join("");
}

function renderEventos() {
    const tbody = document.getElementById("med-eventos-body")!;
    tbody.innerHTML = EVENTOS.map(ev => {
        const tomado = ev.fechaTomada ? `${ev.fechaTomada} ${ev.horaTomada}` : "Pendiente";
        const disabled = ev.estado === "TOMADO" ? "disabled" : "";

        return `
        <tr>
            <td>${ev.idEvento}</td>
            <td>${ev.nino.nombre}</td>
            <td>${ev.medicamento.nombre}</td>
            <td>${ev.fechaProgramada} ${ev.horaProgramada}</td>
            <td>${tomado}</td>
            <td>${ev.estado}</td>
            <td><button class="btn-tomado" data-id="${ev.idEvento}" ${disabled}>
                ${ev.estado === "TOMADO" ? "Tomado" : "Marcar"}
            </button></td>
        </tr>`;
    }).join("");
}

/************************************
 * BUTTON ACTION
 ************************************/
function setupEventClick() {
    document.addEventListener("click", (e) => {
        const t = e.target as HTMLElement;
        if (!t.classList.contains("btn-tomado")) return;

        const id = Number(t.getAttribute("data-id"));
        marcarComoTomado(id);
    });
}

function marcarComoTomado(idEvento: number) {
    const evento = EVENTOS.find(e => e.idEvento === idEvento);
    if (!evento) return;

    // Marca tomado con fecha actual
    const now = new Date();
    evento.estado = "TOMADO";
    evento.fechaTomada = now.toISOString().split("T")[0];
    evento.horaTomada = now.toTimeString().substring(0, 5);

    renderEventos();
}
