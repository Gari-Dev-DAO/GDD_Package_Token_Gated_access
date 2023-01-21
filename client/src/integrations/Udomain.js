import React, { useState } from "react"
import UAuth from "@uauth/js"


const uauth = new UAuth({
    clientID: "25253022-ca91-45b4-9691-02bcd4a876e2",
    redirectUri: "https://marry-soul.vercel.app/",
    scope: "openid wallet"

})

function UDomain() {
    const [Uauth, setUauth] = useState()

    async function Connect() {
        try {
            const authorization = await uauth.loginWithPopup()
            setUauth(JSON.parse(JSON.stringify(authorization))["idToken"])

            await authorization()
        } catch (error) {
            console.error(error)
        }
    }

    async function logOut() {
        await uauth.logout()
        setUauth(null)
    }

    function log() {
        if (Uauth === null || Uauth === undefined) {
            Connect()
        } else {
            logOut()
        }
    }

    return (
        <>
            <button  onClick={log}>{Uauth != null ? Uauth["sub"] : "Login with UNSD"}</button>
        </>
    )
}

export default UDomain