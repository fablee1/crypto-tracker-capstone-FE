import { useState } from "react"
import LoginForm from "../../components/LoginForm"
import { FormWrapper, LoginPageWrapper } from "./styled"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import RegisterForm from "../../components/RegisterForm"

const Login = () => {
  const [userLogsIn, setUserLogsIn] = useState(true)

  return (
    <LoginPageWrapper className="d-flex justify-content-center align-items-center">
      <FormWrapper>
        <ButtonGroup>
          <Button
            variant="success"
            active={!userLogsIn}
            onClick={() => setUserLogsIn(true)}>
            Login
          </Button>
          <Button
            variant="success"
            active={userLogsIn}
            onClick={() => setUserLogsIn(false)}>
            Register
          </Button>
        </ButtonGroup>
        {userLogsIn ? <LoginForm /> : <RegisterForm />}
      </FormWrapper>
    </LoginPageWrapper>
  )
}

export default Login
