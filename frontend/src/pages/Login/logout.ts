import { getElement } from "../../utils/utils";
import { getAccessToken, clearAuth } from "../../state/authState";
import { render } from "../../main";

const apiHost = `${window.location.hostname}`;

export async function logout() {
    const result = getElement<HTMLParagraphElement>("#result");
    const form = getElement<HTMLFormElement>("#login-form");
    const logoutBtn = getElement<HTMLButtonElement>("#logout-btn");

    try {
      const token = getAccessToken();
      await fetch(`http://${apiHost}:8080/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      clearAuth();
      localStorage.removeItem("user");
      getElement("#login-name").textContent = `Sign in / Sign up`;
      getElement("#account-dropdown").classList.add("hidden");

      if (window.location.hash === "#/login")
        render();
      else
        window.location.hash = "#/login";
    } catch {
    }
}

export async function logoutOutsideLoginPage() {

    try {
      const token = getAccessToken();
      await fetch(`http://${apiHost}:8080/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      clearAuth();
      getElement("#account-text").textContent = `Sign in / Sign up`;
      getElement("#account-dropdown").classList.add("hidden");
      window.location.hash = "#/login";
    } catch {
    }
}