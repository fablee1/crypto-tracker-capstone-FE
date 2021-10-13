import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { FormEvent, useState } from "react"
import backend from "../../backend"
import { useHistory } from "react-router-dom"

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  })

  const history = useHistory()

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await backend.post("/auth/register", credentials)
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form onSubmit={(e) => handleRegister(e)}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Choose a username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter your email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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

export default RegisterForm
