import { GithubIcon } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "~components/ui/button"

import "~style.css"

function IndexPopup() {
  // const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  const [user, setUser] = useState({
    email: null
  })

  const handleSignIn = () => {
    chrome.tabs.create({
      url: "http://localhost:3000/api/auth/google",
      selected: true,
      active: true
    })
  }

  const handleLogOut = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async (message) => {
      if (message?.type === "USER_DATA" && message?.data) {
        const { user, accessToken } = message.data
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("accessToken", accessToken)
        setUser(user)

        // remove the tab
        const [currentTab] = await chrome.tabs.query({
          active: true,
          currentWindow: true
        })
        await chrome.tabs.remove(currentTab.id)
      }
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 w-80">
      {user?.email ? (
        <>
          <p>{user?.email as any}</p>
          <Button onClick={handleLogOut} color="red">
            Log Out
          </Button>
        </>
      ) : (
        <Button className="gap-2" onClick={handleSignIn}>
          <GithubIcon />
          Sign In with Google
        </Button>
      )}
    </div>
  )
}

export default IndexPopup
