// @flow
import React from 'react';
import renderer from 'react-test-renderer';
/* import { test, expect } from 'jest';*/

import ModelDescription from './ModelDescription';
import Example from '../../../exampleService.json';

test('MD', () => {
  const params = {
    baseModel: 'base',
    service: Example,
    importedServices: [],
    modelNameClick: () => {},
  };

  const component = renderer.create(
    <ModelDescription {...params} />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
