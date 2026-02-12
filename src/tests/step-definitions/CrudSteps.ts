import { Given, When, Then, Before } from "@cucumber/cucumber";
import { expect, request as playwrightRequest, APIRequestContext, APIResponse } from "@playwright/test";

import { CreateOrder } from "../../main/tasks/CreateOrder"; 
import { GetOrder } from "../../main/tasks/GetOrder";
import { DeleteOrder } from "../../main/tasks/DeleteOrder";
import { GetInventory } from "../../main/tasks/GetInventory";
import { ValidarCrud } from "../../main/questions/ValidarCrud";
import { Order, createRandomOrder } from "../../main/models/OrderModel";

let apiContext: APIRequestContext;
let orderExpect: Order; 
let createOrderResponse: APIResponse;
let getOrderResponse: APIResponse;
let getOrderAfterDeleteResponse: APIResponse;
let getInventoryResponse: APIResponse;
let deleteOrderResponse: APIResponse;

Before(async function () {
    apiContext = await playwrightRequest.newContext();
   
});

Given('que tengo acceso al endPoint de la API', async function () {
    expect(apiContext).toBeDefined();
});

When('realice un CRUD con el id {int} y el estado {string}', async function (id: number, estado: string) {

    orderExpect = createRandomOrder(id, estado);

    createOrderResponse = await CreateOrder.withInfo(orderExpect).execute(apiContext);
    getOrderResponse = await GetOrder.withId(id).execute(apiContext);
    getInventoryResponse = await GetInventory.fromStore().execute(apiContext);
    deleteOrderResponse = await DeleteOrder.withId(id).execute(apiContext);

});

Then('se validara que todas las operaciones fueron exitosas', async function () {
    const getResponseBody = await getOrderResponse.json();

    getOrderAfterDeleteResponse = await GetOrder.withId(getResponseBody.id).execute(apiContext);

    const pasoLaPrueba = await ValidarCrud.deLaOrden(
        createOrderResponse,
        getOrderResponse,
        deleteOrderResponse,
        getInventoryResponse,
        getOrderAfterDeleteResponse,
        orderExpect
    ).esExitoso();

    expect(pasoLaPrueba, "La validación del CRUD falló.").toBe(true);
});