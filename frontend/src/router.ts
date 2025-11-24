import { Login } from './pages/Login/login';
import { dashboard } from './pages/Dashboard/dashboard';
import { Home } from "./pages/Home/homeTemplate";
import { Medicine } from './pages/Medicine/medicine';

export function router(route: string): string {
    switch (route) {
        case '/login':
            return Login();
        case '/dashboard':
            return dashboard();
        case '/settings':
            return '<h1>Settings Page</h1>';
        case '/accounts':
            return '<h1>Account Management</h1>';
        case '/children':
            return '<h1>Children Info</h1>';
        case '/medicine':
            return Medicine();
        case '':
            return Home();
        default:
            return Home();
    }
}
