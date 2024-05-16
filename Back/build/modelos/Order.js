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
exports.Order = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const Product_1 = require("./Product");
const Payment_1 = require("./Payment");
const Dispute_1 = require("./Dispute");
let Order = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({ modelName: 'Order' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _orderDate_decorators;
    let _orderDate_initializers = [];
    let _orderDate_extraInitializers = [];
    let _orderStatus_decorators;
    let _orderStatus_initializers = [];
    let _orderStatus_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _products_decorators;
    let _products_initializers = [];
    let _products_extraInitializers = [];
    let _payment_decorators;
    let _payment_initializers = [];
    let _payment_extraInitializers = [];
    let _dispute_decorators;
    let _dispute_initializers = [];
    let _dispute_extraInitializers = [];
    var Order = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.orderDate = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _orderDate_initializers, void 0));
            this.orderStatus = (__runInitializers(this, _orderDate_extraInitializers), __runInitializers(this, _orderStatus_initializers, void 0));
            this.user = (__runInitializers(this, _orderStatus_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.products = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _products_initializers, void 0));
            this.payment = (__runInitializers(this, _products_extraInitializers), __runInitializers(this, _payment_initializers, void 0));
            this.dispute = (__runInitializers(this, _payment_extraInitializers), __runInitializers(this, _dispute_initializers, void 0));
            __runInitializers(this, _dispute_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Order");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _id_decorators = [(0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true })];
        _userId_decorators = [(0, sequelize_typescript_1.Column)({ allowNull: false })];
        _orderDate_decorators = [(0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.DATE })];
        _orderStatus_decorators = [(0, sequelize_typescript_1.Column)({ allowNull: false })];
        _user_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => User_1.User)];
        _products_decorators = [(0, sequelize_typescript_1.HasMany)(() => Product_1.Product)];
        _payment_decorators = [(0, sequelize_typescript_1.HasOne)(() => Payment_1.Payment)];
        _dispute_decorators = [(0, sequelize_typescript_1.HasOne)(() => Dispute_1.Dispute)];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _orderDate_decorators, { kind: "field", name: "orderDate", static: false, private: false, access: { has: obj => "orderDate" in obj, get: obj => obj.orderDate, set: (obj, value) => { obj.orderDate = value; } }, metadata: _metadata }, _orderDate_initializers, _orderDate_extraInitializers);
        __esDecorate(null, null, _orderStatus_decorators, { kind: "field", name: "orderStatus", static: false, private: false, access: { has: obj => "orderStatus" in obj, get: obj => obj.orderStatus, set: (obj, value) => { obj.orderStatus = value; } }, metadata: _metadata }, _orderStatus_initializers, _orderStatus_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _products_decorators, { kind: "field", name: "products", static: false, private: false, access: { has: obj => "products" in obj, get: obj => obj.products, set: (obj, value) => { obj.products = value; } }, metadata: _metadata }, _products_initializers, _products_extraInitializers);
        __esDecorate(null, null, _payment_decorators, { kind: "field", name: "payment", static: false, private: false, access: { has: obj => "payment" in obj, get: obj => obj.payment, set: (obj, value) => { obj.payment = value; } }, metadata: _metadata }, _payment_initializers, _payment_extraInitializers);
        __esDecorate(null, null, _dispute_decorators, { kind: "field", name: "dispute", static: false, private: false, access: { has: obj => "dispute" in obj, get: obj => obj.dispute, set: (obj, value) => { obj.dispute = value; } }, metadata: _metadata }, _dispute_initializers, _dispute_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Order = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Order = _classThis;
})();
exports.Order = Order;
