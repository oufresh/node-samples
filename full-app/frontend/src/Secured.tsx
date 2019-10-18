import React, { Component } from 'react';
import { initKeyCloack, IKeyCloak } from "./keycloak"
import { UserInfo } from './UserInfo';
import Logout from './Logout';

type SecuredState = {
    keycloak: IKeyCloak | null
    authenticated: boolean
}

export class Secured extends Component<{}, SecuredState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            keycloak: null,
            authenticated: false
        };
    }

    componentDidMount() {
        const keycloak = initKeyCloack();
        keycloak.init({ onLoad: 'login-required' }).success((authenticated: boolean) => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
        });
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
                <div>
                    <p>This is a Keycloak-secured component of your application. You shouldn't be able
                to see this unless you've authenticated with Keycloak.</p>
                    <UserInfo keycloak={this.state.keycloak} />
                    <Logout keycloak={this.state.keycloak} />
                </div>
            ); else return (<div>Unable to authenticate!</div>)
        }
        return (
            <div>Initializing Keycloak...</div>
        );
    }
}
