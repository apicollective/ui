import React from 'react';

import Application from './Application';

describe('Application', function () {
  this.header(`
## Application
`);

  before(() => {
    this.load(<Application />);
  });

  // it('change className', () => this.props({ className: 'changed' }));
});
