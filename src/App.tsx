import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./views/Login"
import Main from "./views/Main"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
