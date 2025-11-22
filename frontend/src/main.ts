import { router } from "./router";

export async function render() {

    const app = document.getElementById("app");
    if (app) {
        const route = window.location.hash.slice(1);
        app.innerHTML = router(route);
    }
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);