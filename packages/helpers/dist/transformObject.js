"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToCamelCase = transformToCamelCase;
function snakeToCamel(snakeStr) {
    var components = snakeStr.split('_');
    return components[0] + components.slice(1).map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); }).join('');
}
function transformToCamelCase(data) {
    if (Array.isArray(data)) {
        // If it's an array, recursively apply the conversion to each element
        return data.map(function (item) { return transformToCamelCase(item); });
    }
    else if (typeof data === 'object' && data !== null) {
        // If it's an object, convert its keys recursively
        var newObj_1 = {};
        Object.keys(data).forEach(function (key) {
            var newKey = snakeToCamel(key);
            // @ts-ignore
            newObj_1[newKey] = transformToCamelCase(data[key]);
        });
        return newObj_1;
    }
    else {
        // If it's a primitive type (string, number, etc.), return the value as is
        return data;
    }
}
