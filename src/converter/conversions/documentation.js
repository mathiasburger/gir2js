const
    getParameterType = require('./glibBasicTypes.js').getParameterType,
    transformJsKeywords = require('./jsKeywords.js').transformJsKeywords;

exports.processDocumentation = function(type, appendAdditionalDocumentation=undefined) {
    if (!type.doc && !appendAdditionalDocumentation) return "";

    let converted = "";
    converted += "/**\n";
    if (type.doc) {
        converted += type.doc[0]._;
    }
    if (appendAdditionalDocumentation) {
        converted += appendAdditionalDocumentation;
    }
    converted += "\n*/";

    return converted;
};

exports.getDocblockSignatureForParameter = function(docTag, parameter, namespace, alternativeParameterName=undefined) {
    let docblockSignature = "";
    docblockSignature += "\n" + docTag + " {";
    docblockSignature += getParameterType(parameter, namespace);
    docblockSignature += "}";
    if (alternativeParameterName === undefined) {
        docblockSignature += " " + transformJsKeywords(parameter.$.name, "", "_");
    } else {
        docblockSignature += " " + alternativeParameterName;
    }
    if (parameter.doc) {
        docblockSignature += " " + parameter.doc[0]._;
    }
    return docblockSignature + "\n";
};

exports.getDocblockReturnValue = function(method, namespace) {
    if (!method['return-value']
        || (/* void */ method['return-value'][0].type && method['return-value'][0].type[0].$.name === "none")) {
        return "";
    }

    return exports.getDocblockSignatureForParameter("@return", method['return-value'][0], namespace, "");
};