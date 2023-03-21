"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.product = exports.users = void 0;
exports.users = [
    {
        id: "0",
        email: "italo@gmail.com",
        password: "40028922"
    },
    {
        id: "1",
        email: "italo2@gmail.com",
        password: "400289222"
    }
];
exports.product = [
    {
        id: "0",
        name: "cadeira",
        price: 200,
        category: "mobília"
    },
    {
        id: "1",
        name: "mesa",
        price: 400,
        category: "mobília"
    }
];
function existeIdNoUser(id) {
    const idEncontrado = exports.users.find((user) => user.id === id);
    return idEncontrado === null || idEncontrado === void 0 ? void 0 : idEncontrado.id;
}
exports.purchase = [
    {
        userId: existeIdNoUser("0"),
        product: "1",
        quantity: 2,
        totalPrice: 800
    },
    {
        userId: exports.users[0].id,
        product: exports.product[0].id,
        quantity: 4,
        totalPrice: exports.product[0].price * 4
    }
];
//# sourceMappingURL=database.js.map