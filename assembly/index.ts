import { PersistentUnorderedMap } from "near-sdk-as";

export const products = new PersistentUnorderedMap<string, string>("PRODCUTS");

export const setProduct = (id: string, productName: string): void => {
    products.set(id, productName);
}

export const getProduct = (id: string): string | null => {
    return products.get(id);
}