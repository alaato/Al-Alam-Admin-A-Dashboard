import {
	createContext,
	useContext,
	useCallback,
	useState,
	useEffect,
	useMemo,
} from "react";
import * as PocketBaseApi from "@/lib/PocketBaseApi";

export const PocketContext = createContext({});

export const PocketProvider = ({ children }: { children: React.ReactNode }) => {
	const pb = PocketBaseApi.pb
	const [token, setToken] = useState<string | null>(pb.authStore.token);
	const [admin, setAdmin] = useState<any | null>(pb.authStore.model);

	const login = useCallback(async (email: string, password: string) => {
		const res = await PocketBaseApi.adminLogin(email, password);
		if (res.status === "success") {
			setToken(pb.authStore.token);
			setAdmin(pb.authStore.model);
		}
		return res;
	}, []);

	const logout = useCallback(async () => {
		const res = await PocketBaseApi.logoutAdmin();
		if (res.status === "success") {
			setToken(null);
			setAdmin(null);
		}
		return res;
	}, []);

	const isLoggedIn = useMemo(() => {
		return PocketBaseApi.isAdminLoggedIn()
	}, []);

	useEffect(() => {
		const unsubscribe = pb.authStore.onChange(() => {
			setToken(pb.authStore.token);
			setAdmin(pb.authStore.model);
		});
		return () => unsubscribe();
	}, []);

	return (
		<PocketContext.Provider value={{ token, admin, login, logout, isLoggedIn }}>
			{children}
		</PocketContext.Provider>
	);
}
