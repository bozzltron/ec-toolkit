'use strict;'

var evolve = require('./evolve');

evolve.where('anything').limit(100000).produces(42)

