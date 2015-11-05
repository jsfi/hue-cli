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

    if (!hueData.username) {
        return helper.output(`No username configured, please set the username or call createUser.`);
    }

    if (args.action[0] === 'ls') {
        return require('./action/ls')(hue, args);
    }

    if (!isNaN(parseInt(args.action[0]))) {
        return require('./action/light')(hue, args);
    }
};
