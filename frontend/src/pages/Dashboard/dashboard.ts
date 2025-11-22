export function dashboard(): string {
	return `<header class="main-header">
            <nav class="navbar">
                <div class="nav-brand">
                    <span>🏠 Nexe Family Support</span>
                </div>
                
                <ul class="nav-links">
                    <li><a href="#dashboard">Dashboard</a></li>
                    <li><a href="#about">Sobre Nosotros</a></li>
                    <li><a href="#contact">Contacto</a></li>
                    <li><a href="#settings">Ajustes</a></li>
					<li><a href="#login">Iniciar Sesión</a></li>
                </ul>
            </nav>
        </header>
        <div class="dashboard-page">
            <h1>📊 Dashboard</h1>
        </div>
    `;
}