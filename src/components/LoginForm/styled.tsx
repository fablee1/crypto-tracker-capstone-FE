import styled from "styled-components"
import Form from "react-bootstrap/Form"

export const SignInUpBtn = styled.button`
  background-color: #3b57f1;
  width: 100%;
  height: 40px;
  font-size: 18px;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 20px;
  transition: all 0.3s;
  &:hover {
    background-color: #314ce6;
  }
`

export const MyFormControl = styled(Form.Control)`
  padding: 10px 10px;
  border: none;
  background-color: #262541;
  color: white;
  &:focus {
    background-color: #2b2a47;
    color: white;
    border: none;
    box-shadow: 0 0 5px 0.1rem #1e1d3b;
  }
`
