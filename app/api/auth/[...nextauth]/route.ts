import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				codigo: { label: "Codigo", type: "number", placeholder: "20212020..." },
				clave: { label: "Clave", type: "password" },
			},
			async authorize(credentials) {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin`,
					{
						method: "POST",
						body: JSON.stringify({
							codigo: credentials?.codigo,
							clave: credentials?.clave,
						}),
						headers: { "Content-Type": "application/json" },
					}
				);
				const user = await res.json();

				if (user.error) throw user;

				return user;
			}
		})
	],
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if(trigger === "update"){
				return {...token, ...session.user}
			}
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
	pages: {
		signIn: "/",
	},
});

export { handler as GET, handler as POST };