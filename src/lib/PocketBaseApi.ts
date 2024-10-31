import PocketBase from "pocketbase";
import { useMemo } from "react";

const BASE_URL = "http://127.0.0.1:8090";

// Initialize the PocketBase client
export const pb = useMemo(() => new PocketBase(BASE_URL), []);
type Response = {
    message: string;
    status: string;
};

// Function to handle user authentication
export async function adminLogin(
    email: string,
    password: string
): Promise<Response> {
    try {
        if (pb.authStore.isAdmin) {
            return { message: "تم تسجيل الدخول بالفعل", status: "error" };
        }
        const authData = await pb.admins.authWithPassword(email, password);
        return { message: "تم تسجيل الدخول بنجاح", status: "success" };
    } catch (error ) {
		return { message: "خطأ في تسجيل الدخول, تأكد من بياناتك", status: "error" };
    }
}

export async function isAdminLoggedIn(): Promise<boolean> {
    return pb.authStore.isAdmin;
}
export async function logoutAdmin(): Promise<Response> {
    if (!pb.authStore.isValid) {
        return { message: "لم يتم تسجيل الدخول", status: "error" };
    }
    pb.authStore.clear();
    return { message: "تم تسجيل الخروج بنجاح", status: "success" };
}
