// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

import ModelDescription from 'application/components/JsonDoc/ModelDescription';
import Example from 'exampleService.json';

test('simple html', () => {
  const params = {
    baseModel: 'base',
    service: Example,
    importedServices: [],
  };

  const component = renderer.create(
    <MemoryRouter>
      <ModelDescription {...params} />
    </MemoryRouter>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
