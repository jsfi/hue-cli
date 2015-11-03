/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const _ = require('lodash');

module.exports = function(args, config) {
    let hueData = loadData(normalizePath(config.data));

    if (args.discover) {
        let bridge = parseInt(args.discover);

        return require('hue-discover')(config.discover)
        .then(bridges => {
            if (isNaN(bridge)) {
                bridge = 0;
            }

            if (args.save) {
                if (bridge in bridges) {
                    hueData.bridge = bridges[bridge];
                    saveData(config.data, hueData);
                } else {
                    output(`${bridge} in ${bridges} not found.`);
                }

                saveData(hueData);
            } else {
                if (bridge in bridges) {
                    output(bridges[bridge]);
                } else {
                    output(`${bridge} in ${bridges} not found.`);
                }
            }
        });
    }

    if (!hueData.bridge) {
        return output(`No bridge configured, please set the IP or call discover.`);
    }

    const hue = require('hue-promise')(hueData);

    if (args.createUser) {
        let deviceType = _.isString(args.createUser) ? args.createUser : 'hue-cli';

        let createUser = function() {
            return hue.configuration.createUser(deviceType)
            .then(response => {
                let username = _.get(response, '[0].success.username');

                if (username) {
                    if (args.save) {
                        hueData.username = username;
                        saveData(config.data, hueData);
                    } else {
                        output(`New username is ${username}.`);
                    }
                } else {
                    throw response;
                }
            });
        }

        return new Promise(function(reject, resolve) {
            createUser()
            .then(resolve)
            .catch(response => {
                let errorType = _.get(response, '[0].error.type');

                if (errorType === 101) {
                    output(`Please press the button on your bridge.`);

                    let interval = setInterval(() =>{
                        createUser()
                        .then(response => {
                            clearInterval(interval);
                            resolve(response);
                        })
                        .catch(response => {
                            let errorType = _.get(response, '[0].error.type');

                            if (errorType !== 101) {
                                clearInterval(interval);
                                reject(response);
                            }
                        })
                    }, 1000);
                } else {
                    reject(response);
                }
            });
        });
    }
};

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
