import styled from "styled-components"
import bg from "../../img/bg.png"

export const FormWrapper = styled.div`
  max-width: 500px;
  min-width: 350px;
  border-radius: 10px;
  background: linear-gradient(
    225deg,
    hsla(236, 23%, 28%, 1) 0%,
    hsla(242, 26%, 19%, 1) 100%
  );
  padding: 20px 50px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

export const LoginPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  &::before {
    content: "";
    background-image: url(${bg});
    background-position: 50% 50%;
    background-size: cover;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.75;
    z-index: -1;
  }
`

export const ButtonLoginRegister = styled.button<{ selected?: boolean }>`
  background-color: transparent;
  border: none;
  font-size: 16px;
  letter-spacing: 2px;
  padding-bottom: 2px;
  font-weight: 500;
  color: ${(props) => (props.selected ? "#318df7" : "#ffffff75")};
  border-bottom: ${(props) => (props.selected ? "3px solid #455ef1" : "")};
  &:hover {
    color: #318df7;
  }
`
