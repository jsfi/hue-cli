/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const _ = require('lodash');

const helper = require('../helper');

module.exports = function(hue, hueData, args, config) {
    let deviceType = _.isString(args.createUser) ? args.createUser : 'hue-cli';

    let createUser = function() {
        return hue.configuration.createUser(deviceType)
        .then(response => {
            let username = _.get(response, '[0].success.username');

            if (username) {
                if (args.save) {
                    hueData.username = username;
                    helper.saveData(config.data, hueData);
                } else {
                    helper.output(`New username is ${username}.`);
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
                helper.output(`Please press the button on your bridge.`);

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
};
