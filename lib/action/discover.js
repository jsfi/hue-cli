/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const helper = require('../helper');

module.exports = function(hueData, args, config) {
    let bridge = parseInt(args.discover);

    return require('hue-discover')(config.discover)
    .then(bridges => {
        if (isNaN(bridge)) {
            bridge = 0;
        }

        if (bridge in bridges) {
            if (args.save) {
                hueData.bridge = bridges[bridge];
                helper.saveData(hueData);
            } else {
                helper.output(bridges[bridge]);
            }
        } else {
            helper.output(`${bridge} in ${bridges} not found.`);
        }
    });
};
