import { useSession } from "next-auth/react"
import {useRouter} from "next/router"


export default function Protected({children}) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login')
  },
})

  if (status === "loading") {
    return "Loading or not authenticated..."
}

return children
}