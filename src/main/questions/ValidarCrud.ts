import { expect, APIResponse } from "@playwright/test";
import { Order } from "../models/OrderModel";

export class ValidarCrud {
    constructor(
        private createRes: APIResponse,
        private getRes: APIResponse,
        private deleteRes: APIResponse,
        private inventoryRes: APIResponse,
        private afterDeleteRes: APIResponse,
        private expected: Order
    ) {}

    static deLaOrden(
        createRes: APIResponse,
        getRes: APIResponse,
        deleteRes: APIResponse,
        inventoryRes: APIResponse,
        afterDeleteRes: APIResponse,
        expected: Order
    ) {
        return new ValidarCrud(createRes, getRes, deleteRes, inventoryRes, afterDeleteRes, expected);
    }

    async esExitoso(): Promise<boolean> {
        try {

            expect(this.createRes.status(), 'Error en crear orden: Status no es 200').toBe(200);
            expect(this.getRes.status(), 'Error en obtener orden: Status no es 200').toBe(200);
            expect(this.inventoryRes.status(), 'Error en obtener el inventario: Status no es 200').toBe(200);
            expect(this.deleteRes.status(), 'Error en eliminar orden: Status no es 200').toBe(200);

            const inventoryBody = await this.inventoryRes.json();
            expect(inventoryBody, `En el Inventario el estado '${this.expected.status}' no existe`)
                .toHaveProperty(this.expected.status);

            const getBody = await this.getRes.json();
            expect(getBody.id, 'ID de orden no coincide').toBe(this.expected.id);
            expect(getBody.petId, 'PetID no coincide').toBe(this.expected.petId);
            expect(getBody.quantity, 'La cantidad no coincide').toBe(this.expected.quantity);
            expect(getBody.shipDate, 'La fecha y hora no coincide')
                .toContain(this.expected.shipDate.split('.')[0]);
            expect(getBody.status, 'Status de la orden no coincide').toBe(this.expected.status);

            const afterDeleteBody = await this.afterDeleteRes.json();
            expect(afterDeleteBody.message, 'La orden sigue existiendo tras la eliminación').toBe('Order not found');

            return true;

        } catch (error: any) {
            console.error("ERROR EN VALIDACIÓN DE QUESTION:");
            console.error(` > Mensaje: ${error.message}`);
                        if (error.actual !== undefined && error.expected !== undefined) {
                console.error(` > Recibido: ${JSON.stringify(error.actual)}`);
                console.error(` > Esperado: ${JSON.stringify(error.expected)}`);
            }
            
            return false;
        }
    }
}