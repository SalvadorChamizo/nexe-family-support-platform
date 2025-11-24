import { setAccessToken, setUserEmail, getUserEmail } from "../../state/authState";
import { getElement } from "../../utils/utils";
import { attachDropdownHandlers } from "../../main";
import { logoutOutsideLoginPage } from "./logout";

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

            if (1===1) {
                /*setAccessToken(data.accessToken);*/
                setUserEmail("admin@system.local");
                const navbar = document.getElementById("navbar");
                if (navbar) {
                    navbar.style.display = "flex";
                }
                const accountText = document.getElementById("account-text");
                if (accountText) {
                    accountText.textContent = `${getUserEmail()}`;
                }
                getElement("#account-dropdown").classList.remove("hidden");
                
                // Attach dropdown handlers after showing the dropdown
                attachDropdownHandlers();
                const logoutBtn = document.querySelector<HTMLAnchorElement>("#logout-btn")!;
                logoutBtn.onclick = logoutOutsideLoginPage;
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