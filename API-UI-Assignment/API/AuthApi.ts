import { APIRequestContext, request } from "@playwright/test";

const BaseUrl = "https://rahulshettyacademy.com";

export type LoginCredentials = {
    userEmail: string;
    userPassword: string;
};

export class AuthApi {
    constructor(private readonly apicontext: APIRequestContext) {}

    static async createRequest(): Promise<AuthApi> {
        const apicontext = await request.newContext({
            baseURL: BaseUrl
        });

        return new AuthApi(apicontext);
    }

    async login({ userEmail, userPassword }: LoginCredentials) {
        const loginResponse = await this.apicontext.post(
            "/api/ecom/auth/login",
            {
                data: {
                    userEmail,
                    userPassword
                }
            }
        );

        return loginResponse;
    }

    async dispose(): Promise<void> {
        await this.apicontext.dispose();
    }
}