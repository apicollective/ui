// @flow
import React from 'react';
import renderer from 'react-test-renderer';

import Element, { JField } from './Element';
import Example from '../../../exampleService.json';

test('Element Model', () => {
  const params = {
    field: undefined,
    type: 'error',
    fieldKey: 'key',
    indent: 4,
    mouseOver: () => {},
    service: Example,
    importedServices: [],
  };

  const component = renderer.create(
    <Element {...params} />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Element Field Model', () => {
  const params = {
    field: {
      name: 'code',
      type: 'error',
    },
    type: 'n/a',
    fieldKey: 'key',
    indent: 4,
    mouseOver: () => {},
    service: Example,
    importedServices: [],
  };

  const component = renderer.create(
    <Element {...params} />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Element Field Value string', () => {
  const params = {
    field: {
      name: 'code',
      type: 'string',
    },
    type: 'n/a',
    fieldKey: 'key',
    indent: 4,
    mouseOver: () => {},
    service: Example,
    importedServices: [],
  };

  const component = renderer.create(
    <Element {...params} />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Element Array', () => {
  const params = {
    field: undefined,
    type: 'attribute[]',
    fieldKey: 'key',
    indent: 4,
    mouseOver: () => {},
    service: Example,
    importedServices: [],
  };

  const component = renderer.create(
    <Element {...params} />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('JField value', () => {
  const params = {
    field: {
      name: 'code',
      type: 'string',
    },
    fieldKey: 'key',
    indent: 4,
    mouseOver: () => {},
    service: Example,
    importedServices: [],
  };

  const component = renderer.create(
    <JField {...params} />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('JField model', () => {
  const params = {
    field: {
      name: 'code',
      type: 'error',
    },
    fieldKey: 'key',
    indent: 4,
    mouseOver: () => {},
    service: Example,
    importedServices: [],
  };

  const component = renderer.create(
    <JField {...params} />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
