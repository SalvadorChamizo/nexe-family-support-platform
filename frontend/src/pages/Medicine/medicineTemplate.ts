export function getMedicineTemplate(): string {
    return `
        <div class="medicine-container">

            <h2>Gestión de Medicación</h2>

            <div class="layout">

                <!-- COLUMNA IZQUIERDA -->
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

                                <tr><td>1</td><td>Lucas</td><td>Martínez Ruiz</td></tr>
                                <tr><td>2</td><td>Ana</td><td>Gómez Pérez</td></tr>
                                <tr><td>3</td><td>Dídac</td><td>Soler Bosch</td></tr>
                                <tr><td>4</td><td>Sara</td><td>López Vidal</td></tr>
                                <tr><td>5</td><td>Pau</td><td>Serra Lloret</td></tr>
                                <tr><td>6</td><td>Julia</td><td>Casas Claramunt</td></tr>
                                <tr><td>7</td><td>Eric</td><td>Martí Llopis</td></tr>
                                <tr><td>8</td><td>Claudia</td><td>Ribas Coll</td></tr>
                                <tr><td>9</td><td>Marc</td><td>Ferré Dalmau</td></tr>
                                <tr><td>10</td><td>Carla</td><td>Batlle Arnau</td></tr>

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

                                <tr><td>1</td><td>Paracetamol</td><td>Analgésico</td></tr>
                                <tr><td>2</td><td>Ventolín</td><td>Broncodilatador</td></tr>
                                <tr><td>3</td><td>Amoxicilina</td><td>Antibiótico</td></tr>
                                <tr><td>4</td><td>Ibuprofeno</td><td>Anti-inflamatorio</td></tr>
                                <tr><td>5</td><td>Clonazepam</td><td>Anticonvulsivo</td></tr>
                                <tr><td>6</td><td>Loratadina</td><td>Antihistamínico</td></tr>
                                <tr><td>7</td><td>Omeprazol</td><td>Protector gástrico</td></tr>
                                <tr><td>8</td><td>Salbutamol</td><td>Inhalador de rescate</td></tr>
                                <tr><td>9</td><td>Diazepam</td><td>Tratamiento de crisis</td></tr>
                                <tr><td>10</td><td>Fluoxetine</td><td>Regulador del estado de ánimo</td></tr>

                            </tbody>
                        </table>
                    </section>
                </div>

                <!-- COLUMNA DERECHA -->
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

                                <tr><td>1</td><td>Lucas</td><td>Paracetamol</td><td>2025-02-10 10:00</td><td>Pendiente</td><td>PENDIENTE</td><td><button class="btn-tomado">Marcar</button></td></tr>
                                <tr><td>2</td><td>Ana</td><td>Amoxicilina</td><td>2025-02-10 08:00</td><td>2025-02-10 08:01</td><td>TOMADO</td><td><button class="btn-tomado" disabled>Tomado</button></td></tr>
                                <tr><td>3</td><td>Dídac</td><td>Ventolín</td><td>2025-02-10 15:30</td><td>Pendiente</td><td>PENDIENTE</td><td><button class="btn-tomado">Marcar</button></td></tr>
                                <tr><td>4</td><td>Sara</td><td>Loratadina</td><td>2025-02-11 09:00</td><td>Pendiente</td><td>PENDIENTE</td><td><button class="btn-tomado">Marcar</button></td></tr>
                                <tr><td>5</td><td>Pau</td><td>Clonazepam</td><td>2025-02-11 12:00</td><td>2025-02-11 12:03</td><td>TOMADO</td><td><button class="btn-tomado" disabled>Tomado</button></td></tr>
                                <tr><td>6</td><td>Julia</td><td>Ibuprofeno</td><td>2025-02-10 18:00</td><td>Pendiente</td><td>PENDIENTE</td><td><button class="btn-tomado">Marcar</button></td></tr>
                                <tr><td>7</td><td>Eric</td><td>Salbutamol</td><td>2025-02-10 20:00</td><td>2025-02-10 20:01</td><td>TOMADO</td><td><button class="btn-tomado" disabled>Tomado</button></td></tr>
                                <tr><td>8</td><td>Claudia</td><td>Diazepam</td><td>2025-02-11 07:30</td><td>Pendiente</td><td>PENDIENTE</td><td><button class="btn-tomado">Marcar</button></td></tr>
                                <tr><td>9</td><td>Marc</td><td>Omeprazol</td><td>2025-02-12 09:15</td><td>Pendiente</td><td>PENDIENTE</td><td><button class="btn-tomado">Marcar</button></td></tr>
                                <tr><td>10</td><td>Carla</td><td>Fluoxetine</td><td>2025-02-10 06:00</td><td>2025-02-10 06:02</td><td>TOMADO</td><td><button class="btn-tomado" disabled>Tomado</button></td></tr>

                            </tbody>
                        </table>
                    </section>

                </div>
            </div>

            <div id="medicine-message" class="message hidden"></div>
        </div>
    `;
}
