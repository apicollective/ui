import React from 'react';

import Operation from './Operation';

describe('Operation', function () {
  this.header(`
## Operation
`);

  before(() => {
    this.load(<Operation />);
  });

  // it('change className', () => this.props({ className: 'changed' }));
});
