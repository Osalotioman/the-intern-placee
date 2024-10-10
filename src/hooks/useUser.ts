import { getCurrentUser } from "@/lib/api/auth";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useUser() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
			try {
				const currentUser = await getCurrentUser();
				setUser(currentUser);
			} catch (e: any) {
				console.log("Couldn't get user");
			}
		};
		getUser();
	}, []);

	return { user };
}
