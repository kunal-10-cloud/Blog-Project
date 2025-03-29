import React from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Regsiter } from "./pages/login/Regsiter"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
import { Account } from "./pages/account/Account"
import { Create } from "./components/create/Create"
import { EditBlog } from "./components/edit/EditBlog"
import { AuthProvider } from "./services/authContext"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Regsiter} />
            <Route exact path='/details/:id' component={DetailsPages} />
            <ProtectedRoute exact path='/account' component={Account} />
            <ProtectedRoute exact path='/create' component={Create} />
            <ProtectedRoute exact path='/edit/:id' component={EditBlog} />
          </Switch>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  )
}
export default App
