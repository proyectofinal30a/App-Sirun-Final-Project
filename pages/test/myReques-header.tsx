import { useEffect } from "react"
import { getSession } from "next-auth/react"
import axios from "axios";
import hash from "../../src-client/controllers/hash";
export default function Page() {
    useEffect(() => {
        (async () => {
            const session: any = await getSession()
            await axios({
                method: "get",
                url: "/api/test/myToke",
                headers: {
                    "Authorization": hash(session)
                }
            })
        })();
    }, [])
    return (
        <div>
            <h1>You are not authorized to view this page!</h1>
        </div>
    )
}

