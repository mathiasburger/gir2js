exports.processClasses = processClasses;

const getDocblockSignatureForParameter2 = require("./documentation").getDocblockSignatureForParameter2;
const processSignals = require("./signals").processSignals;
const processFunctions = require("./function").processFunctions;
const Template = require("../templates/Template").Template;

/**
 * @param {Namespace} namespace
 * @returns {string}
 */
function processClasses(namespace) {
    let converted = "";
    namespace.getClasses().forEach(function (clazz) {
        converted += processClass(namespace.getName(), clazz);
    });
    return converted;
}

/**
 * @param {string} namespace
 * @param {Class} clazz
 * @returns {string}
 */
function processClass(namespace, clazz) {
    let constructorParameters = clazz.getAllProperties().map(function(property) {
        return {
            name: property.getName(),
            type: property.getType()
        };
    });

    const data = clazz.getData();
    return Template.class({
        documentation: clazz.getDocumentation().split("\n"),
        constructorParameters: constructorParameters,
        extends: clazz.getParent().getFullyQualifiedName(),
        prefix: clazz.getNamespaceName(),
        class: clazz.getName(),
        classBody: processSignals(data)
            + processClassProperties(namespace, clazz)
            + processFunctions(namespace, clazz.getAllFunctions(), false)
    });
}

/**
 * @param {string} namespace
 * @param {Class} clazz
 * @returns {string}
 */
function processClassProperties(namespace, clazz) {
    let properties = "";
    clazz.getOwnProperties().forEach(function (property) {
        properties += Template.variableAssignment({
            documentation: property.getDocumentation().split("\n"),
            signature: getDocblockSignatureForParameter2("type", property, namespace).split("\n"),
            prefix: "this",
            variable: property.getName(),
            assignment: "null"
        });
    });
    return properties;
}