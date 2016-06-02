import React from 'react';

import Resource from './Resource';

describe('Resource', function () {
  this.header(`
## Resource
`);

  before(() => {
    this.load(<Resource />);
  });

  // it('change className', () => this.props({ className: 'changed' }));
});
