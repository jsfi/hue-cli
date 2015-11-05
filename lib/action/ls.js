/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const helper = require('../helper');

module.exports = function(hue, args) {
    return hue.lights.findAll()
    .then(data => {
        if (args.long) {
            helper.output(data);
        } else  {
            Object.keys(data).forEach(key => {
                helper.output(`${key}: ${data[key].name}`);
            });
        }
    });
};
