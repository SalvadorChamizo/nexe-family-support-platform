export function attachLoginHandlers(): void {
    const form = document.getElementById('login-form') as HTMLFormElement;
    const googleBtn = document.getElementById('google-login');
    const message = document.getElementById('login-message');

    // Manejar submit del formulario
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        // Mostrar loading
        showMessage('Iniciando sesión...', 'info');

        try {
            // Simular llamada a API (reemplazar con tu API real)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simular validación
            if (email === 'admin@nexe.com' && password === 'admin123') {
                showMessage('¡Login exitoso! Redirigiendo...', 'success');
                setTimeout(() => {
                    window.location.hash = '#dashboard';
                }, 1000);
            } else {
                showMessage('Email o contraseña incorrectos', 'error');
            }
        } catch (error) {
            showMessage('Error al iniciar sesión', 'error');
        }
    });

    // Manejar login con Google
    googleBtn?.addEventListener('click', () => {
        showMessage('Login con Google en desarrollo...', 'info');
    });

    function showMessage(text: string, type: 'success' | 'error' | 'info') {
        if (message) {
            message.textContent = text;
            message.className = `message ${type}`;
            message.classList.remove('hidden');

            if (type !== 'info') {
                setTimeout(() => {
                    message.classList.add('hidden');
                }, 5000);
            }
        }
    }
}