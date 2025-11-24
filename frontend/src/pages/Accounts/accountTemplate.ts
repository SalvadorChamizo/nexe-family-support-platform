export function getCreateAccount(): string {
    return `
        <div class="login-container">
            <!-- Lado izquierdo: Información -->
            <div class="login-info">
                <div class="login-info-content">
                    <h1>Gestión de Cuentas</h1>
                    <p class="subtitle">Crea nuevas cuentas para el personal, familias y administradores</p>
                    
                    <div class="features">
                        <div class="feature-item">
                            <div class="icon">👨‍💼</div>
                            <div>
                                <strong>Personal</strong> - Acceso a herramientas de gestión
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="icon">👨‍👩‍👧</div>
                            <div>
                                <strong>Tutores</strong> - Portal familiar personalizado
                            </div>
                        </div>
                        <div class="feature-item">
                            <div class="icon">⚙️</div>
                            <div>
                                <strong>Administradores</strong> - Control total del sistema
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lado derecho: Selector de tipo de cuenta -->
            <div class="login-form-container">
                <div class="login-card">
                    <div class="login-header">
                        <h2>Crear Nueva Cuenta</h2>
                        <p>Selecciona el tipo de cuenta a crear</p>
                    </div>

                    <div class="account-type-selector">
                        <!-- Staff Account -->
                        <button class="account-type-card" data-account-type="staff">
                            <div class="account-type-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <h3>Cuenta de Personal</h3>
                            <p>Para empleados y trabajadores del centro</p>
                        </button>

                        <!-- Guardian Account -->
                        <button class="account-type-card" data-account-type="guardian">
                            <div class="account-type-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <h3>Cuenta de Tutor</h3>
                            <p>Para padres y tutores legales</p>
                        </button>

                        <!-- Admin Account -->
                        <button class="account-type-card" data-account-type="admin">
                            <div class="account-type-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <h3>Cuenta de Administrador</h3>
                            <p>Acceso completo al sistema</p>
                        </button>
                    </div>

                    <div class="account-back-link">
                        <a href="#/dashboard">← Volver al Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function getCreateStaffAccount(): string {
    return `
        <div class="login-container">
            <!-- Lado izquierdo: Información -->
            <div class="login-info">
                <div class="login-info-content">
                    <h1>Nueva Cuenta de Personal</h1>
                    <p class="subtitle">Crea una cuenta para un miembro del equipo</p>
                    
                    <div class="features">
                        <div class="feature-item">
                            <div class="icon">✓</div>
                            <div>Acceso a herramientas de gestión diaria</div>
                        </div>
                        <div class="feature-item">
                            <div class="icon">✓</div>
                            <div>Permisos de visualización y edición</div>
                        </div>
                        <div class="feature-item">
                            <div class="icon">✓</div>
                            <div>Reportes y seguimiento de casos</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lado derecho: Formulario -->
            <div class="login-form-container">
                <div class="login-card">
                    <div class="login-header">
                        <h2>Crear Cuenta de Personal</h2>
                        <p>Complete la información del empleado</p>
                    </div>

                    <form id="create-staff-form" class="login-form">
                        <!-- Nombre -->
                        <div class="form-group">
                            <label for="staff-first-name">Nombre</label>
                            <input 
                                type="text" 
                                id="staff-first-name" 
                                name="firstName"
                                placeholder="Nombre del empleado"
                                required
                            />
                        </div>

                        <!-- Apellido -->
                        <div class="form-group">
                            <label for="staff-last-name">Apellido</label>
                            <input 
                                type="text" 
                                id="staff-last-name" 
                                name="lastName"
                                placeholder="Apellido del empleado"
                                required
                            />
                        </div>

                        <!-- Email -->
                        <div class="form-group">
                            <label for="staff-email">Correo Electrónico</label>
                            <input 
                                type="email" 
                                id="staff-email" 
                                name="email"
                                placeholder="empleado@nexe.com"
                                required
                            />
                        </div>

                        <!-- Teléfono -->
                        <div class="form-group">
                            <label for="staff-phone">Teléfono</label>
                            <input 
                                type="tel" 
                                id="staff-phone" 
                                name="phone"
                                placeholder="+34 XXX XXX XXX"
                            />
                        </div>

                        <!-- Departamento -->
                        <div class="form-group">
                            <label for="staff-department">Departamento</label>
                            <select 
                                id="staff-department" 
                                name="department"
                                required
                            >
                                <option value="">Seleccionar departamento</option>
                                <option value="social">Servicios Sociales</option>
                                <option value="medical">Médico</option>
                                <option value="education">Educación</option>
                                <option value="admin">Administrativo</option>
                                <option value="other">Otro</option>
                            </select>
                        </div>

                        <!-- Contraseña temporal -->
                        <div class="form-group">
                            <label for="staff-password">Contraseña Temporal</label>
                            <input 
                                type="password" 
                                id="staff-password" 
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <!-- Botones -->
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="staff-cancel-btn">
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Crear Cuenta
                            </button>
                        </div>
                    </form>

                    <!-- Mensaje de error/éxito -->
                    <div id="staff-message" class="message hidden"></div>
                </div>
            </div>
        </div>
    `;
}

export function getCreateGuardianAccount(): string {
    return `
        <div class="login-container">
            <!-- Lado izquierdo: Información -->
            <div class="login-info">
                <div class="login-info-content">
                    <h1>Nueva Cuenta de Tutor</h1>
                    <p class="subtitle">Crea una cuenta para un padre o tutor legal</p>
                    
                    <div class="features">
                        <div class="feature-item">
                            <div class="icon">✓</div>
                            <div>Acceso al portal familiar</div>
                        </div>
                        <div class="feature-item">
                            <div class="icon">✓</div>
                            <div>Seguimiento de sus hijos/pupilos</div>
                        </div>
                        <div class="feature-item">
                            <div class="icon">✓</div>
                            <div>Comunicación directa con el personal</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lado derecho: Formulario -->
            <div class="login-form-container">
                <div class="login-card">
                    <div class="login-header">
                        <h2>Crear Cuenta de Tutor</h2>
                        <p>Complete la información del tutor</p>
                    </div>

                    <form id="create-guardian-form" class="login-form">
                        <!-- Nombre -->
                        <div class="form-group">
                            <label for="guardian-first-name">Nombre</label>
                            <input 
                                type="text" 
                                id="guardian-first-name" 
                                name="firstName"
                                placeholder="Nombre del tutor"
                                required
                            />
                        </div>

                        <!-- Apellido -->
                        <div class="form-group">
                            <label for="guardian-last-name">Apellido</label>
                            <input 
                                type="text" 
                                id="guardian-last-name" 
                                name="lastName"
                                placeholder="Apellido del tutor"
                                required
                            />
                        </div>

                        <!-- Email -->
                        <div class="form-group">
                            <label for="guardian-email">Correo Electrónico</label>
                            <input 
                                type="email" 
                                id="guardian-email" 
                                name="email"
                                placeholder="tutor@email.com"
                                required
                            />
                        </div>

                        <!-- Teléfono -->
                        <div class="form-group">
                            <label for="guardian-phone">Teléfono</label>
                            <input 
                                type="tel" 
                                id="guardian-phone" 
                                name="phone"
                                placeholder="+34 XXX XXX XXX"
                                required
                            />
                        </div>

                        <!-- Relación -->
                        <div class="form-group">
                            <label for="guardian-relationship">Relación con el Menor</label>
                            <select 
                                id="guardian-relationship" 
                                name="relationship"
                                required
                            >
                                <option value="">Seleccionar relación</option>
                                <option value="parent">Padre/Madre</option>
                                <option value="legal-guardian">Tutor Legal</option>
                                <option value="foster-parent">Familia de Acogida</option>
                                <option value="other">Otro</option>
                            </select>
                        </div>

                        <!-- Dirección -->
                        <div class="form-group">
                            <label for="guardian-address">Dirección</label>
                            <input 
                                type="text" 
                                id="guardian-address" 
                                name="address"
                                placeholder="Calle, número, ciudad"
                            />
                        </div>

                        <!-- Contraseña temporal -->
                        <div class="form-group">
                            <label for="guardian-password">Contraseña Temporal</label>
                            <input 
                                type="password" 
                                id="guardian-password" 
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <!-- Botones -->
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="guardian-cancel-btn">
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Crear Cuenta
                            </button>
                        </div>
                    </form>

                    <!-- Mensaje de error/éxito -->
                    <div id="guardian-message" class="message hidden"></div>
                </div>
            </div>
        </div>
    `;
}
