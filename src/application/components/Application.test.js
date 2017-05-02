// @flow
import React from 'react';
import renderer from 'react-test-renderer';

import { Application } from 'application/components/Application';
import Example from 'exampleService.json';
import { actions as serviceActions } from 'generated/version';

test('Application Home', () => {
  const params = {
    actions: serviceActions,
    params: {
      model: undefined,
      resource: undefined,
      method: '',
      path: '',
      applicationKey: '',
      organizationKey: '',
    },
    loaded: true,
    service: Example,
    importedServices: [],
  };

  const component = renderer.create(<Application {...params} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
