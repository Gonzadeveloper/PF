"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Reputation_1 = require("./Reputation");
const Cart_1 = require("./Cart");
const Order_1 = require("./Order");
const Address_1 = require("./Address");
const Review_1 = require("./Review");
const Product_1 = require("./Product");
let User = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({
            modelName: 'User',
            tableName: 'Users',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _password_decorators;
    let _password_initializers = [];
    let _password_extraInitializers = [];
    let _role_decorators;
    let _role_initializers = [];
    let _role_extraInitializers = [];
    let _cart_decorators;
    let _cart_initializers = [];
    let _cart_extraInitializers = [];
    let _orders_decorators;
    let _orders_initializers = [];
    let _orders_extraInitializers = [];
    let _addresses_decorators;
    let _addresses_initializers = [];
    let _addresses_extraInitializers = [];
    let _reviews_decorators;
    let _reviews_initializers = [];
    let _reviews_extraInitializers = [];
    let _productsAsSeller_decorators;
    let _productsAsSeller_initializers = [];
    let _productsAsSeller_extraInitializers = [];
    let _productsAsBuyer_decorators;
    let _productsAsBuyer_initializers = [];
    let _productsAsBuyer_extraInitializers = [];
    let _reputation_decorators;
    let _reputation_initializers = [];
    let _reputation_extraInitializers = [];
    var User = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.role = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.cart = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _cart_initializers, void 0));
            this.orders = (__runInitializers(this, _cart_extraInitializers), __runInitializers(this, _orders_initializers, void 0));
            this.addresses = (__runInitializers(this, _orders_extraInitializers), __runInitializers(this, _addresses_initializers, void 0));
            this.reviews = (__runInitializers(this, _addresses_extraInitializers), __runInitializers(this, _reviews_initializers, void 0));
            this.productsAsSeller = (__runInitializers(this, _reviews_extraInitializers), __runInitializers(this, _productsAsSeller_initializers, void 0));
            this.productsAsBuyer = (__runInitializers(this, _productsAsSeller_extraInitializers), __runInitializers(this, _productsAsBuyer_initializers, void 0));
            this.reputation = (__runInitializers(this, _productsAsBuyer_extraInitializers), __runInitializers(this, _reputation_initializers, void 0));
            __runInitializers(this, _reputation_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "User");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _name_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false
            })];
        _email_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false,
                unique: true
            })];
        _password_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false
            })];
        _role_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false
            })];
        _cart_decorators = [(0, sequelize_typescript_1.HasOne)(() => Cart_1.Cart)];
        _orders_decorators = [(0, sequelize_typescript_1.HasMany)(() => Order_1.Order)];
        _addresses_decorators = [(0, sequelize_typescript_1.HasMany)(() => Address_1.Address)];
        _reviews_decorators = [(0, sequelize_typescript_1.HasMany)(() => Review_1.Review)];
        _productsAsSeller_decorators = [(0, sequelize_typescript_1.HasMany)(() => Product_1.Product, { foreignKey: 'userId', as: 'productsAsSeller' })];
        _productsAsBuyer_decorators = [(0, sequelize_typescript_1.HasMany)(() => Product_1.Product, { foreignKey: 'userId', as: 'productsAsBuyer' })];
        _reputation_decorators = [(0, sequelize_typescript_1.HasOne)(() => Reputation_1.Reputation)];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: obj => "password" in obj, get: obj => obj.password, set: (obj, value) => { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _cart_decorators, { kind: "field", name: "cart", static: false, private: false, access: { has: obj => "cart" in obj, get: obj => obj.cart, set: (obj, value) => { obj.cart = value; } }, metadata: _metadata }, _cart_initializers, _cart_extraInitializers);
        __esDecorate(null, null, _orders_decorators, { kind: "field", name: "orders", static: false, private: false, access: { has: obj => "orders" in obj, get: obj => obj.orders, set: (obj, value) => { obj.orders = value; } }, metadata: _metadata }, _orders_initializers, _orders_extraInitializers);
        __esDecorate(null, null, _addresses_decorators, { kind: "field", name: "addresses", static: false, private: false, access: { has: obj => "addresses" in obj, get: obj => obj.addresses, set: (obj, value) => { obj.addresses = value; } }, metadata: _metadata }, _addresses_initializers, _addresses_extraInitializers);
        __esDecorate(null, null, _reviews_decorators, { kind: "field", name: "reviews", static: false, private: false, access: { has: obj => "reviews" in obj, get: obj => obj.reviews, set: (obj, value) => { obj.reviews = value; } }, metadata: _metadata }, _reviews_initializers, _reviews_extraInitializers);
        __esDecorate(null, null, _productsAsSeller_decorators, { kind: "field", name: "productsAsSeller", static: false, private: false, access: { has: obj => "productsAsSeller" in obj, get: obj => obj.productsAsSeller, set: (obj, value) => { obj.productsAsSeller = value; } }, metadata: _metadata }, _productsAsSeller_initializers, _productsAsSeller_extraInitializers);
        __esDecorate(null, null, _productsAsBuyer_decorators, { kind: "field", name: "productsAsBuyer", static: false, private: false, access: { has: obj => "productsAsBuyer" in obj, get: obj => obj.productsAsBuyer, set: (obj, value) => { obj.productsAsBuyer = value; } }, metadata: _metadata }, _productsAsBuyer_initializers, _productsAsBuyer_extraInitializers);
        __esDecorate(null, null, _reputation_decorators, { kind: "field", name: "reputation", static: false, private: false, access: { has: obj => "reputation" in obj, get: obj => obj.reputation, set: (obj, value) => { obj.reputation = value; } }, metadata: _metadata }, _reputation_initializers, _reputation_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
})();
exports.User = User;
