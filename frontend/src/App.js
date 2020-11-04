import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen' 
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'

function App() {
  return (

    <Router>
      <Header />
        <main className="py-3">
          <Container>
            <Route path = '/order/:id' exact={false} component={OrderScreen} />
            <Route path = '/placeorder' exact={false} component={PlaceOrderScreen} />
            <Route path = '/payment' exact={false} component={PaymentScreen} />
            <Route path = '/shipping' exact={false} component={ShippingScreen} />
            <Route path = '/login' exact={false} component={LoginScreen} />
            <Route path = '/register' component={RegisterScreen} />
            <Route path = '/profile' component={ProfileScreen} />
            <Route path = '/product/:id' component={ProductScreen} />
            <Route path = '/cart/:id?' component={CartScreen} />
            <Route path = '/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path = '/' exact={true} component={HomeScreen} />
            <Route path='/admin/productlist' component={ProductListScreen} exact />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
