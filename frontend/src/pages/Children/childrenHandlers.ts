import { getChildCard } from "./childrenTemplate";

export async function childrenHandler() {
	const addChildBtn = document.getElementById("btn-add-child");
	if (addChildBtn)
	{
		addChildBtn.addEventListener("click", () => {
			
		});
	}
}

// export function newChildForm(): void {
//     const form = document.getElementById('btn-add-child') as HTMLFormElement;
//     const googleBtn = document.getElementById('google-login');
//     const message = document.getElementById('login-message');

//     // Manejar submit del formulario
//     form?.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const first_name = (document.getElementById('first_name') as HTMLInputElement).value;
//         const last_name = (document.getElementById('last_name') as HTMLInputElement).value;        
// 	})
// }