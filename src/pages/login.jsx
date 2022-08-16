import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <main>
        <h1>Welcome to Login route</h1>
        <button
          onClick={() => {
            signIn("github").then(() => router.push('/dashboard'));
            
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </button>
      </main>
    </div>
  );
};

export default Login;