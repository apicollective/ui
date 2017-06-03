// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

import { Application } from 'application/components/Application';
import Example from 'exampleService.json';
import { actions as serviceActions } from 'generated/version';

test('Application Home', () => {
  const params = {
    actions: serviceActions,
    match: {
      params: {
        model: undefined,
        resource: undefined,
        method: '',
        path: '',
        applicationKey: '',
        organizationKey: '',
      },
      url: '/',
      path: '/',
      isExact: true,
    },
    loaded: true,
    service: Example,
    importedServices: [],
  };

  const component = renderer.create(
    <MemoryRouter>
      <Application {...params} />
    </MemoryRouter>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
