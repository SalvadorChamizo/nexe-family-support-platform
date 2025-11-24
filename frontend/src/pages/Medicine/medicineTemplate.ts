export function getMedicineTemplate(): string {
    return `
        <div class="medicine-container">

            <h2>Gestión de Medicación</h2>

            <div class="layout">

                <!-- Columna izquierda -->
                <div class="column">

                    <!-- NIÑOS -->
                    <section class="card">
                        <h3>Niños</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                </tr>
                            </thead>
                            <tbody id="med-ninos-body">
                                <tr>
                                    <td>1</td>
                                    <td>Lucas</td>
                                    <td>Martínez Ruiz</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Ana</td>
                                    <td>Gómez Pérez</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Dídac</td>
                                    <td>Soler Bosch</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <!-- MEDICAMENTOS -->
                    <section class="card">
                        <h3>Medicamentos</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody id="med-meds-body">
                                <tr>
                                    <td>1</td>
                                    <td>Paracetamol</td>
                                    <td>Analgésico</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Ventolín</td>
                                    <td>Inhalador broncodilatador</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Amoxicilina</td>
                                    <td>Antibiótico</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>

                <!-- Columna derecha -->
                <div class="column">

                    <!-- EVENTOS -->
                    <section class="card">
                        <h3>Eventos de medicación</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Niño</th>
                                    <th>Medicamento</th>
                                    <th>Programado</th>
                                    <th>Tomado</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody id="med-eventos-body">
                                <tr>
                                    <td>1</td>
                                    <td>Lucas</td>
                                    <td>Paracetamol</td>
                                    <td>2025-02-10 10:00</td>
                                    <td>Pendiente</td>
                                    <td>PENDIENTE</td>
                                    <td>
                                        <button class="btn-tomado" disabled>Marcar como tomado</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Ana</td>
                                    <td>Amoxicilina</td>
                                    <td>2025-02-10 08:00</td>
                                    <td>2025-02-10 08:01</td>
                                    <td>TOMADO</td>
                                    <td>
                                        <button class="btn-tomado" disabled>Tomado</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Dídac</td>
                                    <td>Ventolín</td>
                                    <td>2025-02-10 15:30</td>
                                    <td>Pendiente</td>
                                    <td>PENDIENTE</td>
                                    <td>
                                        <button class="btn-tomado" disabled>Marcar como tomado</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                </div>
            </div>

            <div id="medicine-message" class="message hidden"></div>
        </div>
    `;
}
