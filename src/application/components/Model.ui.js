import React from 'react';

import Model from './Model';

describe('Model', function () {
  this.header(`
## Model
`);

  const spec = {
    name: 'test',
  };
  // const spec = 'test'

  before(() => {
    this.load(<Model spec={spec} />);
  });

  // it('change className', () => this.props({ className: 'changed' }));
});
