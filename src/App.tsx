import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./views/Login"

const App = () => {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route path="/" />
    </Router>
  )
}

export default App
