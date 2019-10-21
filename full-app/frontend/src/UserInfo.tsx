import React, { Component } from 'react';
import { loadUser } from "./user";

export class UserInfo extends Component<{ }, { name: string, email: string, id: string, login: string, error: boolean }> {

  constructor(props: { }) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: "",
      login: "",
      error: false
    };
  }

  loadUser = async () => {
    try {
      const user = await loadUser("test", "test");
      console.log(user);
      debugger;
      this.setState({
        name: user.name,
        email: user.email,
        id: user.id,
        login: user.login
      });
    } catch (e) {
      console.error(e);
      this.setState({ error: true });
    }
  }

  componentDidMount() {
    this.loadUser();
  }

  render() {
    return (
      <div className="UserInfo">
        <p>Name: {this.state.name}</p>
        <p>Email: {this.state.email}</p>
        <p>Login: {this.state.login}</p>
        <p>ID: {this.state.id}</p>
      </div>
    );
  }
}
