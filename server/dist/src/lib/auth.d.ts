import "dotenv/config";
export declare const auth: import("better-auth").Auth<{
    baseURL: string | undefined;
    secret: string | undefined;
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    trustedOrigins: string[];
    emailAndPassword: {
        enabled: true;
    };
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
        };
    };
    user: {
        additionalFields: {
            role: {
                type: "string";
                required: false;
                defaultValue: string;
                input: true;
            };
            status: {
                type: "string";
                required: false;
                defaultValue: string;
                input: false;
            };
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map