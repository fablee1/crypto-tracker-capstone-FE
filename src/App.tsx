import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./views/Login"
import Main from "./views/Main"

const App = () => {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route path="/">
        <Main />
      </Route>
    </Router>
  )
}

export default App
