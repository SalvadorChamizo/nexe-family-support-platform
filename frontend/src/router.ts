import { Home } from "./pages/Home/homeTemplate";
import { Login } from "./pages/Login/loginTemplate";


export function router(route: string): string {
    switch (route) {
        case "/login":
            return Login();
        case "":
            return Home();
        default:
            return Home();
    }
}