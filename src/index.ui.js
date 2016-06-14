/*
 The index of specs.

 Notice the require statement is embedded within a "describe"
 block.  Use this pattern to structure, nest and organize your
 visual tests as you see fit.

 */

describe('Components', function () {
  require('./application/components/Application.ui');
  require('./application/components/Resource.ui');
  require('./application/components/Operation.ui');
  require('./application/components/Body.ui');
  require('./application/components/BodyType.ui');
  require('./application/components/Model.ui');
});
