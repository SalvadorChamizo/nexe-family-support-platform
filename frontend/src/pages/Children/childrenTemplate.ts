export function getChildrenPage(): string {
    return `
        <div class="children-page">
            <!-- Header de la página -->
            <div class="children-header">
                <div class="header-content">
                    <h1>Gestión de Niños</h1>
                    <p>Administra la información de los niños y sus familias</p>
                </div>
                <button class="btn btn-add-child" id="btn-add-child">
                    <span class="icon">+</span>
                    Agregar Niño
                </button>
            </div>

            <!-- Barra de búsqueda y filtros -->
            <div class="children-controls">
                <div class="search-box">
                    <input 
                        type="text" 
                        id="search-input" 
                        placeholder="Buscar por nombre..."
                        class="search-input"
                    />
                </div>

                <div class="filter-controls">
                    <select id="filter-gender" class="filter-select">
                        <option value="">Todos los géneros</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>

                    <select id="filter-medical" class="filter-select">
                        <option value="">Info médica</option>
                        <option value="with">Con información</option>
                        <option value="without">Sin información</option>
                    </select>

                    <button id="btn-clear-filters" class="btn-clear-filters">
                        Limpiar filtros
                    </button>
                </div>
            </div>

            <!-- Estado vacío (cuando no hay niños) -->
            <div class="empty-state" id="empty-state">
                <h3>No hay niños registrados</h3>
            </div>

            <!-- Estado sin resultados (cuando la búsqueda no encuentra nada) -->
            <div class="no-results-state hidden" id="no-results-state">
                <h3>No se encontraron resultados</h3>
                <p>Intenta ajustar los filtros de búsqueda</p>
            </div>
        </div>

        <!-- Modal para crear/editar niño -->
        <div class="modal hidden" id="child-modal">
            <div class="modal-overlay" id="modal-overlay"></div>
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 id="modal-title">Agregar Nuevo Niño</h2>
                    <button class="modal-close" id="modal-close">&times;</button>
                </div>

                <div class="modal-body">
                    <!-- Wizard Steps -->
                    <div class="wizard-steps">
                        <div class="wizard-step active" data-step="1">
                            <div class="step-number">1</div>
                            <span>Información Básica</span>
                        </div>
                        <div class="wizard-step" data-step="2">
                            <div class="step-number">2</div>
                            <span>Info Médica</span>
                        </div>
                        <div class="wizard-step" data-step="3">
                            <div class="step-number">3</div>
                            <span>Tutores</span>
                        </div>
                        <div class="wizard-step" data-step="4">
                            <div class="step-number">4</div>
                            <span>Personal</span>
                        </div>
                    </div>

                    <form id="child-form">
                        <!-- Step 1: Información Básica -->
                        <div class="form-step active" data-step="1">
                            <h3 class="step-title">Información Básica del Niño</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="first_name">
                                        Nombre <span class="required">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="first_name" 
                                        name="first_name"
                                        placeholder="Ej: Juan"
                                        required
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="last_name">
                                        Apellido <span class="required">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="last_name" 
                                        name="last_name"
                                        placeholder="Ej: Pérez"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="birthdate">
                                        Fecha de Nacimiento <span class="required">*</span>
                                    </label>
                                    <input 
                                        type="date" 
                                        id="birthdate" 
                                        name="birthdate"
                                        required
                                    />
                                    <span class="helper-text" id="age-display"></span>
                                </div>

                                <div class="form-group">
                                    <label for="gender">
                                        <span class="icon">⚧</span>
                                        Género
                                    </label>
                                    <select id="gender" name="gender">
                                        <option value="">Seleccionar...</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="notes">
                                    Notas Generales
                                </label>
                                <textarea 
                                    id="notes" 
                                    name="notes"
                                    rows="4"
                                    placeholder="Información adicional relevante..."
                                ></textarea>
                            </div>
                        </div>

                        <!-- Step 2: Información Médica -->
                        <div class="form-step" data-step="2">
                            <h3 class="step-title">Información Médica</h3>
                            
                            <div class="alert-box info">
                                <p>Esta información es opcional pero recomendada para el cuidado del niño</p>
                            </div>

                            <div class="form-group">
                                <label for="allergies">
                                    Alergias
                                </label>
                                <textarea 
                                    id="allergies" 
                                    name="allergies"
                                    rows="3"
                                    placeholder="Ej: Polen, frutos secos, lactosa..."
                                ></textarea>
                                <span class="helper-text">Separa múltiples alergias con comas</span>
                            </div>

                            <div class="form-group">
                                <label for="diagnosis">
                                    Diagnóstico
                                </label>
                                <textarea 
                                    id="diagnosis" 
                                    name="diagnosis"
                                    rows="3"
                                    placeholder="Condiciones médicas o diagnósticos relevantes..."
                                ></textarea>
                            </div>

                            <div class="form-group">
                                <label for="medications">
                                    Medicaciones
                                </label>
                                <textarea 
                                    id="medications" 
                                    name="medications"
                                    rows="3"
                                    placeholder="Medicamentos actuales, dosis y frecuencia..."
                                ></textarea>
                            </div>

                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="no-medical-info" />
                                    <span>No tiene información médica relevante</span>
                                </label>
                            </div>
                        </div>

                        <!-- Step 3: Tutores -->
                        <div class="form-step" data-step="3">
                            <h3 class="step-title">Tutores o Responsables</h3>
                            
                            <div class="alert-box warning">
                                <p>Debes agregar al menos un tutor o responsable</p>
                            </div>

                            <div id="guardians-list">
                                <!-- Los tutores se agregarán dinámicamente aquí -->
                            </div>

                            <button type="button" class="btn btn-secondary" id="btn-add-guardian">
                                <span class="icon">+</span>
                                Agregar Tutor
                            </button>
                        </div>

                        <!-- Step 4: Personal Asignado -->
                        <div class="form-step" data-step="4">
                            <h3 class="step-title">Asignar Personal</h3>
                            
                            <div class="alert-box info">
                                <p>Puedes asignar personal después de crear el niño</p>
                            </div>

                            <div class="form-group">
                                <label>Personal Disponible</label>
                                <div id="staff-list" class="checkbox-list">
                                    <!-- El staff se cargará dinámicamente -->
                                    <div class="loading-text">Cargando personal...</div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btn-prev-step">
                        ← Anterior
                    </button>
                    <button type="button" class="btn btn-primary" id="btn-next-step">
                        Siguiente →
                    </button>
                    <button type="submit" class="btn btn-primary hidden" id="btn-submit-child">
                        Guardar Niño
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal para ver detalles del niño -->
        <div class="modal hidden" id="child-detail-modal">
            <div class="modal-overlay" id="detail-modal-overlay"></div>
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 id="detail-child-name">Cargando...</h2>
                    <button class="modal-close" id="detail-modal-close">&times;</button>
                </div>

                <div class="modal-body">
                    <div class="tabs">
                        <div class="tab-buttons">
                            <button class="tab-button active" data-tab="general">General</button>
                            <button class="tab-button" data-tab="medical">Información Médica</button>
                            <button class="tab-button" data-tab="guardians">Tutores</button>
                            <button class="tab-button" data-tab="staff">Personal</button>
                        </div>

                        <div class="tab-content">
                            <!-- Tab General -->
                            <div class="tab-pane active" data-tab="general">
                                <div id="general-info-content">
                                    <!-- Se cargará dinámicamente -->
                                </div>
                            </div>

                            <!-- Tab Medical -->
                            <div class="tab-pane" data-tab="medical">
                                <div id="medical-info-content">
                                    <!-- Se cargará dinámicamente -->
                                </div>
                            </div>

                            <!-- Tab Guardians -->
                            <div class="tab-pane" data-tab="guardians">
                                <div id="guardians-info-content">
                                    <!-- Se cargará dinámicamente -->
                                </div>
                            </div>

                            <!-- Tab Staff -->
                            <div class="tab-pane" data-tab="staff">
                                <div id="staff-info-content">
                                    <!-- Se cargará dinámicamente -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" id="btn-edit-child">
                        Editar
                    </button>
                    <button class="btn btn-danger" id="btn-delete-child">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>

        <!-- Template para tarjeta de niño -->
        <template id="child-card-template">
            <div class="child-card" data-child-id="">
                <div class="card-header">
                    <div class="child-avatar">
                        <span class="avatar-text"></span>
                    </div>
                    <div class="child-info">
                        <h3 class="child-name"></h3>
                        <p class="child-meta">
                            <span class="age"></span> • <span class="gender"></span>
                        </p>
                    </div>
                </div>

                <div class="card-badges">
                    <!-- Los badges se agregarán dinámicamente -->
                </div>

                <div class="card-footer">
                    <button class="btn-icon" title="Ver detalles">
                        <span>👁️</span>
                    </button>
                    <button class="btn-icon" title="Editar">
                        <span>✏️</span>
                    </button>
                    <button class="btn-icon" title="Eliminar">
                        <span>🗑️</span>
                    </button>
                </div>
            </div>
        </template>

        <!-- Template para tutor en el formulario -->
        <template id="guardian-form-template">
            <div class="guardian-item">
                <div class="guardian-header">
                    <h4>Tutor <span class="guardian-number"></span></h4>
                    <button type="button" class="btn-remove-guardian">
                        <span>×</span>
                    </button>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>
                            <span class="icon">🆔</span>
                            ID de Usuario <span class="required">*</span>
                        </label>
                        <input 
                            type="number" 
                            name="guardian_user_id"
                            placeholder="Ej: 101"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label>
                            Nombre Completo <span class="required">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="guardian_name"
                            placeholder="Ej: María González"
                            required
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>
                            Relación
                        </label>
                        <select name="guardian_relationship">
                            <option value="">Seleccionar...</option>
                            <option value="madre">Madre</option>
                            <option value="padre">Padre</option>
                            <option value="abuelo">Abuelo/a</option>
                            <option value="tio">Tío/a</option>
                            <option value="hermano">Hermano/a</option>
                            <option value="tutor">Tutor Legal</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>
                            Teléfono
                        </label>
                        <input 
                            type="tel" 
                            name="guardian_phone"
                            placeholder="+34 123 456 789"
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>
                            Email
                        </label>
                        <input 
                            type="email" 
                            name="guardian_email"
                            placeholder="ejemplo@email.com"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label>
                        Dirección
                    </label>
                    <input 
                        type="text" 
                        name="guardian_address"
                        placeholder="Calle Principal 123"
                    />
                </div>
            </div>
        </template>
    `;
}

export function getChildCard(child: any): string {
	return `
		<div class="child-card" data-child-id="">
			<div class="card-header">
				<div class="child-info">
					<h3 class="child-name">${ child.name }</h3>
					<p class="child-meta">
						<span class="age">${ child.age }</span> • <span class="gender">${ child.gender }</span>
					</p>
				</div>
			</div>

			<div class="card-footer">
				<button class="btn-icon" title="Ver detalles">
					<span>👁️</span>
				</button>
				<button class="btn-icon" title="Editar">
					<span>✏️</span>
				</button>
				<button class="btn-icon" title="Eliminar">
					<span>🗑️</span>
				</button>
			</div>
		</div>
	`;
}

export function addChildren(child: any): string {
	return `		
	`;
}