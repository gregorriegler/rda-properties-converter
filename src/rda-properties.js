'use strict'

const yaml = require('js-yaml');

module.exports.fromYaml = function (fooBar) {
    const walk = (object, parentPath, action) => {
        const fullPath = () => {
            if (!parentPath) return property;
            return parentPath + '.' + property;
        };

        for (var property in object) {
            if (!object.hasOwnProperty(property)) {
                continue;
            }
            if (typeof object[property] === "object") {
                walk(object[property], fullPath(), action);
            } else {
                action(fullPath(), object[property]);
            }
        }
    }

    let rdaProperties = '';
    walk(yaml.load(fooBar), '', function (key, value) {
        rdaProperties += 'application.params.[' + key + '].name=' + key + '\n'
        rdaProperties += 'application.params.[' + key + '].value=' + value + '\n'
    })
    return rdaProperties;
};