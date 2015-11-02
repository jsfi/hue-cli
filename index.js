#! /usr/bin/env node
/*
 * hue-cli
 * https://github.com/jsfi/hue-cli
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const config = require('./lib/loadConfig');

require('./lib/controller.js')(
    require('parse-cli-arguments')(config.args),
    config
);
