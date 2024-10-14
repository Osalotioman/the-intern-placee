import { getCurrentUser } from "@/lib/api/auth";
import { isErrorInstance } from "@/lib/utils";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useUser() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
			try {
				const currentUser = await getCurrentUser();
				setUser(currentUser);
			} catch (e: unknown) {
				if(isErrorInstance(e)) {
					console.log(e.code);
				}
			}
		};
		getUser();
	}, []);

	return { user };
}
