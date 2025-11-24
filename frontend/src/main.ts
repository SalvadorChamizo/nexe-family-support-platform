import { router } from "./router";
import { attachLoginHandlers } from "./pages/Login/loginHandlers";
import { getAccessToken, getUserEmail, refreshAccessToken } from "./state/authState";
import { getElement } from "./utils/utils";
import { logoutOutsideLoginPage } from "./pages/Login/logout";
import { createAccountHandlers } from "./pages/Accounts/accountHandlers";

export function attachDropdownHandlers() {
    const accountToggle = document.getElementById("account-toggle");
    const accountDropdown = document.getElementById("account-dropdown");
    
    if (accountToggle && accountDropdown) {
        accountToggle.addEventListener("click", (e) => {
            e.preventDefault();
            accountDropdown.classList.toggle("show");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!accountToggle.contains(e.target as Node) && !accountDropdown.contains(e.target as Node)) {
                accountDropdown.classList.remove("show");
            }
        });
    }
}

export async function render() {

    await refreshAccessToken();

    const app = document.getElementById("app");
    if (app) {
        const route = window.location.hash.slice(1);
        app.innerHTML = router(route);
    }

    const token = getAccessToken();
    if (token) {
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
    } else {
        const navbar = document.getElementById("navbar");
            if (navbar) {
                navbar.style.display = "none";
            }
            const accountText = document.getElementById("account-text");
            if (accountText) {
                accountText.textContent = "Account";
            }
    }

    if (location.hash === "#/login")
    {
        attachLoginHandlers();
    }
    if (location.hash === "#/accounts")
    {
        createAccountHandlers();
    }
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);