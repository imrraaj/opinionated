import { signIn, signOut, useSession } from "next-auth/react";


function Protected() {

  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (data?.user) {
    return (
      <div>
        Hello, {data.user.email ?? data.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        You are not logged in! <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
}

Protected.auth = true;
export default Protected;