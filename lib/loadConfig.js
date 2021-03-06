/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const _ = require('lodash');

const userConfig = require('../config/user');
const defaultConfig = require('../config/default');

module.exports = _.defaultsDeep({}, userConfig, defaultConfig);
