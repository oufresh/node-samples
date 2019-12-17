import { route } from 'navi';
import React from 'react';
import { withKeycloak } from "react-keycloak";
import { AppRoot } from '../layout/AppRoot';
import { AppHeader } from '../layout/AppHeader';
import { AppMain } from "../layout/AppMain";
import { AppButton } from '../layout/AppButton';
import { AppTitle } from "../layout/AppTitle";

const LoginPage = withKeycloak(({ keycloak }) => {
    return (
        <AppRoot>
            <AppHeader>
                <AppTitle />
                <AppButton onClick={() => keycloak.login()}>Login</AppButton>
            </AppHeader>
            <AppMain>
                <p>Please do login ...</p>
            </AppMain>
        </AppRoot>
    );
});

export default route({
    title: 'Login',
    view: <LoginPage />
});