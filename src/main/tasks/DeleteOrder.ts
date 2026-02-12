import { APIRequestContext, APIResponse } from "@playwright/test";

export class DeleteOrder {
    static withId(id: number) {

        const baseUrl = process.env.BASE_URL;

        return {
            execute: async (apiContext: APIRequestContext): Promise<APIResponse> => {
                const baseUrl = process.env.BASE_URL;

                if (!baseUrl) {
                    throw new Error("BASE_URL no definida");
                }

                const urlClean = baseUrl.replace(/\/$/, ""); 
                const fullUrl = `${urlClean}/store/order/${id}`;
                return await apiContext.delete(fullUrl);
            }
        };
    }
}