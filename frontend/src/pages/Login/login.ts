export function login(): string {
    return `
        <div class="login-container">
            <!-- Lado izquierdo: Información -->
            <div class="login-info">
                <div class="login-info-content">
                    <h1>Nexe Family Support</h1>
                    <p class="subtitle">Plataforma de gestión y soporte familiar</p>
                </div>
            </div>

            <!-- Lado derecho: Formulario -->
            <div class="login-form-container">
                <div class="login-card">
                    <div class="login-header">
                        <h2>Iniciar Sesión</h2>
                        <p>Bienvenido de nuevo</p>
                    </div>

                    <form id="login-form" class="login-form">
                        <!-- Email -->
                        <div class="form-group">
                            <label for="email">
                                Correo Electrónico
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <!-- Password -->
                        <div class="form-group">
                            <label for="password">
                                Contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <!-- Recordarme y Olvidé contraseña -->
                        <div class="form-options">
                            <label class="checkbox-label">
                                <input type="checkbox" id="remember" name="remember">
                                <span>Recordarme</span>
                            </label>
                            
                            <a href="#forgot-password" class="forgot-link">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <!-- Botón de login -->
                        <button type="submit" class="btn btn-primary">
                            Iniciar Sesión
                        </button>

                    </form>

                    <!-- Mensaje de error/éxito -->
                    <div id="login-message" class="message hidden"></div>
                </div>

                <!-- Links adicionales en el footer -->
                <div class="login-footer">
                    <a href="#about">Sobre Nosotros</a>
                    <span>•</span>
                    <a href="#contact">Contacto</a>
                    <span>•</span>
                    <a href="#terms">Términos de Uso</a>
                    <span>•</span>
                    <a href="#privacy">Privacidad</a>
                </div>
            </div>
        </div>
    `;
}