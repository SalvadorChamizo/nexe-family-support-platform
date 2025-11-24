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
                                <!-- Rellenado por JS -->
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
                                <!-- Rellenado por JS -->
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
                                <!-- Rellenado por JS -->
                            </tbody>
                        </table>
                    </section>

                </div>
            </div>

            <div id="medicine-message" class="message hidden"></div>
        </div>
    `;
}

