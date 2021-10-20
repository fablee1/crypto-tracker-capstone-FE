import { useState } from "react"
import LoginForm from "../../components/LoginForm"
import { ButtonLoginRegister, FormWrapper, LoginPageWrapper } from "./styled"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import RegisterForm from "../../components/RegisterForm"

const Login = () => {
  const [userLogsIn, setUserLogsIn] = useState(true)

  return (
    <LoginPageWrapper className="d-flex justify-content-center align-items-center overflow-hidden position-relative">
      <FormWrapper>
        <ButtonGroup className="w-100 d-flex justify-content-center my-2">
          <ButtonLoginRegister
            selected={userLogsIn}
            onClick={() => setUserLogsIn(true)}
            className="me-3">
            Sign in
          </ButtonLoginRegister>
          <ButtonLoginRegister
            selected={!userLogsIn}
            onClick={() => setUserLogsIn(false)}>
            Sign up
          </ButtonLoginRegister>
        </ButtonGroup>
        <h2 className="text-white mt-4 mb-3">Welcome Back!</h2>
        {userLogsIn ? <LoginForm /> : <RegisterForm />}
      </FormWrapper>
    </LoginPageWrapper>
  )
}

export default Login
