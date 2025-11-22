export function Home(): string {

    return `
        <div class="landing-page">
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="hero-content">
                    <h1 class="hero-title">Nexe Fundació</h1>
                    <p class="hero-tagline">40 años mejorando vidas, construyendo futuro</p>
                    <div class="hero-description">
                    <p>
                        Nexe Fundació es una entidad que trabaja desde hace 40 años con la voluntad de mejorar la calidad de vida de los niños con pluridiscapacidad y sus familias y defender sus derechos.
                    </p>
                    <p>
                        A lo largo de nuestra trayectoria, hemos creado una red de servicios innovadores y pioneros – reconocidos en el ámbito estatal y europeo – para dar respuesta a las necesidades de los niños y sus familias, favoreciendo su autonomía y socialización.
                    </p>
                    <p>
                        Así mismo, compartimos nuestra experiencia formando otros profesionales, desarrollando proyectos de investigación y sensibilizando a la sociedad.
                    </p>
                    </div>
                    <div class="hero-buttons">
                        <a href="#/login" class="btn btn-primary-large">Acceder a la Plataforma</a>
                        <a href="#contact" class="btn btn-secondary-large">Contáctanos</a>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="./public/hero-image.webp" alt="Nexe Fundació - Apoyo familiar">
                </div>
            </section>
        </div>
    `;
}