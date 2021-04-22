import React, { Component, Fragment } from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Animal from './components/Animal';
import Food from './components/Food';
class App extends Component {
  render() {
    return <Fragment>
      <AppHeader />
      <Food />
      <Animal />
      <AppFooter />
    </Fragment>;
  }
}
export default App;
