import { APIRequestContext, APIResponse } from "@playwright/test";

export class GetInventory {
    static fromStore() {

         const baseUrl = process.env.BASE_URL;

        return {
            execute: async (apiContext: APIRequestContext): Promise<APIResponse> => {
                  const baseUrl = process.env.BASE_URL;

                if (!baseUrl) {
                    throw new Error("BASE_URL no definida");
                }

                const urlClean = baseUrl.replace(/\/$/, ""); 
                const fullUrl = `${urlClean}/store/inventory`;
                return await apiContext.get(fullUrl);
            }
        };
    }
}