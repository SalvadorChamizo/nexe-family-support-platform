import { router } from "./router";
import { attachLoginHandlers } from "./pages/Login/loginHandlers";
import { refreshAccessToken } from "./state/authState";

export async function render() {

    await refreshAccessToken();

    const app = document.getElementById("app");
    if (app) {
        const route = window.location.hash.slice(1);
        app.innerHTML = router(route);
    }

    if (location.hash === "#/login")
    {
        attachLoginHandlers();
    }
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);