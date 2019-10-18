export interface IKeyCloak {
    init: (opt: any) => {
        success: any,
        error:((e: any) => any)
    },
    accountManagement: () => any
    clearToken: () => any
    createAccountUrl: (options: any) => any
    createLoginUrl: (options: any) => any
    createLogoutUrl: (options: any) => any
    createRegisterUrl: (options: any) => any
    hasRealmRole: (role: any) => any
    hasResourceRole: (role: any, resource: any) => any
    isTokenExpired: (minValidity: any) => any
    loadUserInfo: () => any
    loadUserProfile: () => any
    login: (options: any) => any
    logout: (options?: any) => any
    register: (options: any) => any
    updateToken: (minValidity: any) => any
}

export function initKeyCloack(): IKeyCloak {
    return (window as any).Keycloak('/keycloak.json');
}