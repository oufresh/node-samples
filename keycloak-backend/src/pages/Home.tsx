import React, { useCallback } from "react";
import { useKeycloak } from "react-keycloak";
import { AppRoot } from "../layout/AppRoot";
import { AppHeader } from "../layout/AppHeader";
import { AppButton } from "../layout/AppButton";
import { AppMain } from "../layout/AppMain";
import { AppTitle } from "../layout/AppTitle";
import { useAxios } from "../lib/useAxios";

export const Home: React.FC = () => {
    const { keycloak } = useKeycloak();
    const axiosInstance = useAxios('');
    const callApi = useCallback(async () => {
        try {
            const resp = await axiosInstance.get('/version');
            console.log(resp.data);
        } catch (e) {
            console.error(e);
        }
    }, [axiosInstance]);
  
    return <AppRoot>
        <AppHeader>
            <AppTitle />
            {!!keycloak.authenticated && (
                <AppButton type="button" onClick={() => keycloak.logout()}>
                    Logout
            </AppButton>
            )}
        </AppHeader>
        <AppMain>
            <div>User is {!keycloak.authenticated ? 'NOT ' : ''} authenticated</div>
            <AppButton type="button" onClick={callApi}>
                Get version
            </AppButton>
        </AppMain>
    </AppRoot>;
}