import React, { useEffect, useLayoutEffect } from 'react'
import { IntlProvider } from 'react-intl'
import Layout from './components/layout'
import  Auth  from './components/auth'
import config from './_config'
import  Hobbies  from './components/hobbies'
import  Dashboard  from './components/dashboard'
import Posts from './components/posts'
import Users from './components/users'

import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter,
  useLocation,
  Redirect,
} from 'react-router-dom' 
import authHeader from './services/auth-header'

const App: React.FC = () => {
  const location = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  

  useEffect(() => {
    document.title = "Hobby Hub"
  }, []);

  console.log("logged in is: ",authHeader())
  if (!authHeader() && location.pathname !== '/auth') {
    return <Redirect to={'/auth'} />;
}
else{
  return (
    
    <div className="App">    
      <Switch>
        <Route path="/auth" component={Auth} />
        <Layout>
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/hobbies" component={Hobbies} />
            <Route path="/posts" component={Posts} />
            <Route path="/users" component={Users} />
          </Switch>
        </Layout>
        <Route path="*" component={Auth} />
      </Switch>
    </div>
  )
}
}

// Use different router type depending on configuration
const AppRouterComponent: React.FC = ({ children }) => {

  return config.navigationType === 'history' ? (
    <BrowserRouter>{children}</BrowserRouter>
  ) : (
    <HashRouter>{children}</HashRouter>
  )

}

const AppWithPrividers: React.FC = () => (

  <IntlProvider locale={navigator.language}>
    <AppRouterComponent>
      <App />
    </AppRouterComponent>
  </IntlProvider>

)



export default AppWithPrividers