/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const helper = require('./helper');

module.exports = function(args, config) {
    let hueData = helper.loadData(config.data);

    if (args.discover) {
        return require('./action/discover')(hueData, args, config);
    }

    if (!hueData.bridge) {
        return helper.output(`No bridge configured, please set the IP or call discover.`);
    }

    const hue = require('hue-promise')(hueData);

    if (args.createUser) {
        return require('./action/createUser')(hue, hueData, args, config);
    }
};
