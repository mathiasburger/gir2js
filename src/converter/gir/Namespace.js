const Interface_ = require("./Interface_").Interface_;
const NamedElement = require("./NamedElement").NamedElement;
const Class = require('./Class').Class;
const Constant = require('./Constant').Constant;
const Enumeration = require('./Enumeration').Enumeration;
const Function = require('./Function').Function;

class Namespace extends NamedElement {
    /**
     * @param {*} namespace
     * @constructor
     */
    constructor(namespace) {
        super(namespace, namespace);

        /**
         * @type {boolean}
         * */
        this._initialized = false;

        /**
         * @dict
         * @type {Object.<string, Class>}
         */
        this._classesByName = {};

        /**
         * @dict
         * @type {Object.<string, Class>}
         */
        this._interfacesByName = {};
    }

    init() {
        if (this._initialized === true)
            return;

        const self = this;
        this.getClasses().forEach(function(clazz) {
            self._classesByName[clazz.getName()] = clazz;
        });

        this._initialized = true;
    };

    init2() {
        if (this._initialized2 === true)
            return;

        const self = this;
        this.getInterfaces().forEach(function(interface_) {
            self._interfacesByName[interface_.getName()] = interface_;
        });

        this._initialized2 = true;
    };

    /**
     * @return {Array.<Constant>}
     */
    getConstants() {
        if (!this.getNamespace().constant)
            return [];

        const self = this;
        return this.getNamespace().constant.map(function(constant) {
            return new Constant(constant, self);
        });
    }

    /**
     * @return {Array.<Enumeration>}
     */
    getEnumerations() {
        if (!this.getNamespace().enumeration)
            return [];

        const self = this;
        return this.getNamespace().enumeration.map(function(enumeration) {
            return new Enumeration(enumeration, self);
        });
    }

    /**
     * @return {Array.<Enumeration>}
     */
    getBitfields() {
        if (!this.getNamespace().bitfield)
            return [];

        const self = this;
        return this.getNamespace().bitfield.map(function(bitfield) {
            return new Enumeration(bitfield, self);
        });
    }

    /**
     * @return {Array.<Function>}
     */
    getFunctions() {
        if (!this.getNamespace().function)
            return [];

        const self = this;
        return this.getNamespace().function.map(function(func) {
            return new Function(func, self);
        });
    }

    /**
     * @return {Array.<Function>}
     */
    getCallbackFunctions() {
        if (!this.getNamespace().callback)
            return [];

        const self = this;
        return this.getNamespace().callback.map(function(func) {
            return new Function(func, self);
        });
    }

    /**
     * @return {Array.<Interface_>}
     */
    getInterfaces() {
        if (!this.getNamespace().interface)
            return [];

        const self = this;
        return this.getNamespace().interface.map(interface_ => new Interface_(interface_, self));
    }

    /**
     * @return {Array.<Class>}
     */
    getClasses() {
        if (!this.getNamespace().class)
            return [];

        const self = this;
        return this.getNamespace().class.map(function(clazz) {
            return new Class(clazz, self);
        });
    }

    /**
     * @param {string} name
     * @return {Class}
     */
    getClassByName(name) {
        this.init();
        return this._classesByName[name];
    }

    /**
     * @param {string} name
     * @return {Class}
     */
    getInterfaceByName(name) {
        this.init2();
        return this._interfacesByName[name];
    }
}

exports.Namespace = Namespace;