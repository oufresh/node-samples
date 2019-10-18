import React, { Component } from 'react';
import { IKeyCloak } from './keycloak';

export class UserInfo extends Component<{ keycloak: IKeyCloak }, { name: string, email: string, id: string}> {

  constructor(props: { keycloak: IKeyCloak }) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: ""
    };
    this.props.keycloak.loadUserInfo().success((userInfo: any) => {
        console.log(userInfo);
        this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub})
    });

    console.log("hasRealmRole ADM: ", this.props.keycloak.hasRealmRole("ADM"));
  }

  render() {
    return (
      <div className="UserInfo">
        <p>Name: {this.state.name}</p>
        <p>Email: {this.state.email}</p>
        <p>ID: {this.state.id}</p>
        <p>{this.props.keycloak.hasRealmRole("ADM") === true ? "App administrator" : "App visualizer"}</p>
      </div>
    );
  }
}
