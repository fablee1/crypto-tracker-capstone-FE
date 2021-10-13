import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { FormEvent, useState } from "react"
import backend from "../../backend"
import { useHistory } from "react-router-dom"

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
        <Form.Label>Email address Or username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email or username"
          value={credentials.login}
          onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default LoginForm
