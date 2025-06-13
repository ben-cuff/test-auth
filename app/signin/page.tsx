"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Custom signin page for next-auth
export default function SignInPage() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const result = await signIn("credentials", {
			username,
			password,
			redirect: false,
		});

		if (result?.ok) {
			router.push("/");
		} else {
			console.error("Login failed.");
			alert(
				"Login failed. Make sure you entered the correct username, email, and password"
			);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
			>
				<h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
				<div className="mb-4">
					<label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
						Username:
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>
				<div className="mb-6">
					<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
						Password:
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					Sign In
				</button>
			</form>
			<Link
				href="/register"
				className="mt-4 inline-block text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Register
			</Link>
		</div>
	);
}
