/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(args, config) {
    let data = loadData(normalizePath(config.data));

    if (args.discover) {
        let bridge = parseInt(args.discover);

        return require('hue-discover')(config.discover)
        .then(bridges => {
            if (isNaN(bridge)) {
                bridge = 0;
            }

            if (args.save) {
                if (bridge in bridges) {
                    data.bridge = bridges[bridge];
                    saveData(config.data, data);
                } else {
                    output(`${bridge} in ${bridges} not found.`);
                }

                saveData(data);
            } else {
                if (bridge in bridges) {
                    output(bridges[bridge]);
                } else {
                    output(`${bridge} in ${bridges} not found.`);
                }
            }
        });
    }

    if (!data.bridge) {
        return output(`No bridge configured, please set the IP or call discover.`);
    }
};

function loadData(data) {
    try {
        return JSON.parse(require(data));
    } catch(e) {
        return {};
    }
}

function saveData(path, data) {
    require('fs').writeFileSync(normalizePath(path), JSON.stringify(data));
}

function output(text) {
    console.log(text); // eslint-disable-line no-console
}

function normalizePath(path) {
    if (path.charAt(0) === '~') {
        return require('untildify')(path);
    }

    return path;
}
