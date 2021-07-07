"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get unique error field name
 */
var uniqueMessage = function (error) {
    var output;
    try {
        var fieldName = error.message.substring(error.message.lastIndexOf(".$") + 2, error.message.lastIndexOf("_1"));
        output =
            fieldName.charAt(0).toUpperCase() +
                fieldName.slice(1) +
                " already exists";
    }
    catch (ex) {
        output = "Unique field already exists";
    }
    return output;
};
/**
 * Get the erroror message from error object
 */
var errorHandler = function (error) {
    var message = "";
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message = "Something went wrong";
        }
    }
    else {
        for (var errorName in error.errorors) {
            if (error.errorors[errorName].message)
                message = error.errorors[errorName].message;
        }
    }
    return message;
};
exports.default = errorHandler;
