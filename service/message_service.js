const Product = require("../schemas/messageSchema");

export class MessageService {
    async getProducts() {
        const products = await Product.find({});
        return products;
    };

    async createProduct(body) {
        return await Product.create(body);
    };
}


