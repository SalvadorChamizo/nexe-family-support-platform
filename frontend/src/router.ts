import { login } from './pages/Login/login';
import { dashboard } from './pages/Dashboard/dashboard';

export async function router(route: string): Promise<string> {
    switch (route) {
		case '':
		case '#':
		case '#login':
			return login();
		case '#dashboard':
			return dashboard();
		case '#settings':
			return '<h1>Settings Page</h1>';
		default:
			return '<h1 class="not-found">404 Not Found</h1>';
    }
}