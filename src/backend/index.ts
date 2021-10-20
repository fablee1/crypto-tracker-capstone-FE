import axios from "axios"

const backend = axios.create({
  baseURL: process.env.REACT_APP_BE_URL_PROD,
  withCredentials: true,
})

const refreshAccessToken = async () => {
  await backend.post("/auth/refreshToken")
}

backend.interceptors.response.use(
  (response) => response,
  async function (error) {
    const failedRequest = error.config
    if (error.response.status === 401 && failedRequest.url !== "/auth/refreshToken") {
      await refreshAccessToken()

      const retryRequest = backend(failedRequest)
      return retryRequest
    } else if (failedRequest.url === "/auth/refreshToken") {
      window.location.href = "/login"
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)

export default backend
