'use strict;'

var evolve = require('./evolve');

evolve
  .where('anything')
  .produces(42)
  .populate(10)
  .limit(1000)

