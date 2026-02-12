export interface Order {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    status: string;
    complete: boolean;
}

export const createRandomOrder = (id: number, status: string): Order => ({
    id: id,
    petId: Math.floor(Math.random() * 1000) + 1,
    quantity: Math.floor(Math.random() * 10) + 1,
    shipDate: new Date().toISOString(),
    status: status,
    complete: true
});