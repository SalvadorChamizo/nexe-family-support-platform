import { setAccessToken } from "../../state/authState";

const apiHost = `${window.location.hostname}`;

export function attachLoginHandlers(): void {
    const form = document.getElementById('login-form') as HTMLFormElement;
    const googleBtn = document.getElementById('google-login');
    const message = document.getElementById('login-message');

    // Manejar submit del formulario
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        console.log("Entra");
        // Mostrar loading
        showMessage('Iniciando sesión...', 'info');

        try {
            const res = await fetch(`http://${apiHost}:8080/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            let data: any = {};
            try {
                data = await res.json();
            } catch {
                data = {};
            }

            if (res.ok && data.accessToken) {
                setAccessToken(data.accessToken);
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
        console.log("Sale por aquí")
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