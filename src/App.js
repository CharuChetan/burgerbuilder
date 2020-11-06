import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (<div>
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Layout>
    </div>);
  }
}

export default App;
