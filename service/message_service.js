const Product = require("../schemas/messageSchema");

export class MessageService {
    constructor(parameters) {
        
    }

    

async getProducts () {
    const products = await Product.find({});
    return products;
};

}


