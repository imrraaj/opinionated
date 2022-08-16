import { signIn, signOut, useSession } from "next-auth/react";

function Dashboard() {
    return (
        <>
            Super secret page
        </>
    )
}

Dashboard.auth = true
export default Dashboard;