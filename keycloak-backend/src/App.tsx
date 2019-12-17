import React, { useCallback } from 'react';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from "react-keycloak";
import { AppRouter } from './routes/AppRouter';

const keycloak = Keycloak();

const App: React.FC = () => {
  const onKeycloakEvent = useCallback((event: any, error: any) => {
    console.log('onKeycloakEvent', event, error);
  }, []);

  const onKeycloakTokens = useCallback((tokens: any) => {
    console.log('onKeycloakTokens', tokens);
  }, []);

  return (
    <KeycloakProvider
      keycloak={keycloak}
      //initConfig={{ onLoad: "check-sso "}}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
    >
      <AppRouter />
    </KeycloakProvider>);
}

export default App;
