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
    let light = args.action[0];
    let brightness = parseInt(args.action[1]);

    if (!isNaN(brightness)) {
        return hue.lights.setBrightness(light, brightness).then(helper.output);
    }

    if (args.on) {
        return hue.lights.switchOn(light).then(helper.output);
    }

    if (args.off) {
        return hue.lights.switchOff(light).then(helper.output);
    }
};
