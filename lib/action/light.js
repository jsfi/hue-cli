/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(hue, args) {
    let light = args.action[0];
    let val = args.action[1];

    if (val && val.length) {
        if (val == parseInt(val)) {
            return hue.lights.setBrightness(light, parseInt(val));
        }

        if (val.split(',').length === 3) {
            return hue.lights.setState(light, {
                bri: require('hue-color')(val.split(',').map(el => parseInt(el.split())), 'B')
            });
        }
    }

    if (args.on) {
        return hue.lights.switchOn(light);
    }

    if (args.off) {
        return hue.lights.switchOff(light);
    }
};
