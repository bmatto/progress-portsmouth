import * as React from 'react';

export { fields } from './fields.jsx';
export const meta = {
  label: `Test Update Module`,
};

export const Component = (props) => {
  return <div>{props.fieldValues.update}</div>;
};
