import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IKeyCloak } from './keycloak';

export interface ILogoutProps extends RouteComponentProps<any> {
    keycloak: IKeyCloak;
}

class Logout extends Component<ILogoutProps, {}> {

  logout() {
    this.props.history.push('/');
    this.props.keycloak.logout();
  }

  render() {
    return (
      <button onClick={ () => this.logout() }>
        Logout
      </button>
    );
  }
}
export default withRouter(Logout);