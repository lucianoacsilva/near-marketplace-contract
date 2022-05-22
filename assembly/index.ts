import { Product, listedProducts } from "./model";
import { ContractPromiseBatch, context } from "near-sdk-as";

export function setProduct(product: Product): void {
    let storedProduct: Product | null = listedProducts.get(product.id);

    if (storedProduct) {
        throw new Error(`a product with ${product.id} already exists`);
    }

    listedProducts.set(product.id, Product.fromPayload(product));
}

export function getProduct(id: string): Product | null {
    return listedProducts.get(id);
}

export function getProducts(): Product[] {
    return listedProducts.values();
}

export function buyProduct(productId: string): void {
    const product: Product | null = getProduct(productId);

    if (!product) {
        throw new Error("Product not found!");
    } else if (product.price.toString() != context.attachedDeposit.toString()) {
        throw new Error("Product not found!");
    }

    ContractPromiseBatch.create(product.owner).transfer(context.attachedDeposit);
    product.incrementSoldAmount();

    listedProducts.set(product.id, product);
}