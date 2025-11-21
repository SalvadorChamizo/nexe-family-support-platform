import { router } from "./router";

export async function render() {

    const app = document.getElementById("app");
    if (app) {
        app.innerHTML = router(window.location.hash);
    }
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);