import axios from "axios"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://viewstats-xi.vercel.app/google*"]
}

// Function to get accessToken from URL parameters
const getAccessToken = (): string | null => {
  const params = new URLSearchParams(window.location.search)
  const accessToken = params.get("accessToken")
  return accessToken
}

// Function to send the accessToken to the backend
const getUser = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:3000/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log("GOT USER DATA: ", response?.data)
    const data = {
      user: response.data,
      accessToken: token
    }
    chrome.runtime.sendMessage({ type: "USER_DATA", data })
  } catch (error) {
    console.error("Error sending token to backend:", error)
  }
}

// Main logic
const accessToken = getAccessToken()
if (accessToken) {
  getUser(accessToken)
} else {
  console.error("No accessToken found in URL parameters.")
}
