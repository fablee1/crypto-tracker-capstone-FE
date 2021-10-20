import Form from "react-bootstrap/Form"
import { ChangeEvent, FormEvent, useState } from "react"
import backend from "../../backend"
import { useHistory } from "react-router-dom"
import { MyFormControl, SignInUpBtn } from "./styled"

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ login: "", password: "" })

  const history = useHistory()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await backend.post("/auth/login", credentials)
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form onSubmit={(e) => handleLogin(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-white">Email or username</Form.Label>
        <MyFormControl
          type="text"
          placeholder="Email / Username"
          value={credentials.login}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCredentials({ ...credentials, login: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-white">Password</Form.Label>
        <MyFormControl
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </Form.Group>
      <SignInUpBtn type="submit" className="my-4">
        Sign In
      </SignInUpBtn>
    </Form>
  )
}

export default LoginForm
