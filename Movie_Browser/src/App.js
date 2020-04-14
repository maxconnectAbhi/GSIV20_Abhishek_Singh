import React, { Component } from 'react';
import StackNavigator from './components/Navigation/StackNavigator';

export const UserCotext = React.createContext()

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // globalStateChange = (name, value) => {
  // }


  render() {
    return (
      <UserCotext.Provider
        value={{
          state: this.state,
          globalStateChange: this.globalStateChange
        }}>
        <StackNavigator />
      </UserCotext.Provider>
    )
  }
}
