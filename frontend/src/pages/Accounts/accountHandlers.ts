import { getCreateStaffAccount } from "./accountTemplate";

export async function createAccountHandlers(){

    const addStaffBtn = document.getElementById("addStaffBtn");
    if (addStaffBtn) {
        addStaffBtn.addEventListener("click", () => {
            const accountContainer = document.getElementById("account-container");
            if (accountContainer) {
                accountContainer.innerHTML = getCreateStaffAccount();
            }
        })
    }

    const createStaffForm = document.getElementById("create-staff-form");

    if (createStaffForm) {
        createStaffForm.addEventListener("submit", () => {

            const firstName = (document.getElementById("staff-first-name") as HTMLInputElement).value;
            const lastName = (document.getElementById("staff-last-name") as HTMLInputElement).value;
            const staffEmail = (document.getElementById("staff-email") as HTMLInputElement).value;
            const staffPhone = (document.getElementById("staff-phone") as HTMLInputElement).value;
            const staffDepartment = (document.getElementById("staff-department") as HTMLInputElement).value;
            const staffPassword = (document.getElementById("staff-password") as HTMLInputElement).value;
        })
    }
}