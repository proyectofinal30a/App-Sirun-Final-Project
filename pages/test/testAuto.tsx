import { getSession } from "next-auth/react"
import { useState, useEffect } from 'react'
export default function Page() {

    let [na, setNa] = useState({
        user: {
            role: ''
        }
    })
    useEffect(() => {
        const hola = async () => {
            const ho: any = await getSession()
            setNa(ho)
        }
        hola()
    }, [])


    if (na && na.user.role === "admin") {
        return (
            <div>
                <h1>Admin</h1>
                <p>Welcome to the Admin Portal!</p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>You are not authorized to viewsdasdasdsad this page!</h1>
            </div>
        )
    }
}