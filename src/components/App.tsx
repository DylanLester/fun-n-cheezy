import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import MealSelectionsPage from "./MealSelectionsPage"
import PlanSelectionsPage from "./PlanSelectionsPage"
import Header from "./Header"

const App: React.FC = () => {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/meal-selections">
          <MealSelectionsPage />
        </Route>
        <Route path="/plan-selections">
          <PlanSelectionsPage />
        </Route>
        <Route path="/">
          <Redirect to="/plan-selections" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
