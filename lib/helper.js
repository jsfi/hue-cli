/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const _ = require('lodash');

module.exports = {
    loadData: loadData,
    saveData: saveData,
    output: output
}

function loadData(data) {
    try {
        return require(normalizePath(data));
    } catch(e) {
        return {};
    }
}

function saveData(path, data) {
    require('fs').writeFileSync(normalizePath(path) + '.json', JSON.stringify(data));
}

function output(text) {
    console.log(text); // eslint-disable-line no-console
}

function normalizePath(path) {
    if (_.startsWith(path, '~')) {
        return require('untildify')(path);
    }

    return path;
}
