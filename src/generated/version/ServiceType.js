// @flow
// THIS FILE WILL BE GENERATED in the future

export type Header = {
  name: string,
  type: string,
  required: boolean,
  description?: string,
  default?: string,
};

export type Organization = {
  key: string,
};

export type Application = {
  key: string,
};

export type Import = {
  uri: string,
  namespace: string,
  organization: Organization,
  application: Application,
  version: string,
  enums: Array<string>,
  unions: Array<string>,
  models: Array<string>,
};

export type EnumValue = {
  name: string,
  description?: string,
};

export type Enum = {
  name: string,
  plural: string,
  description?: string,
  values: Array<EnumValue>,
};

export type UnionType = {
  type: string,
  description?: string,
};

export type Union = {
  name: string,
  plural: string,
  descriminator?: string,
  description?: string,
  types: Array<UnionType>,
};

export type Field = {
  name: string,
  type: string,
  description?: string,
  default?: string,
  required?: boolean,
  minimum?: number,
  maximum?: number,
  example?: string,
};

export type Model = {
  name: string,
  plural: string,
  description?: string,
  fields: Array<Field>,
};

export type Method = string;

export type Parameter = {
  name: string,
  type: string,
  location: string,
  description?: string,
  required?: boolean,
  default?: string,
  minimum?: number,
  maximum?: number,
  example?: string,
};

export type Response = {
  code: string,
  type: string,
  description?: string,
};

export type Body = {
  type: string,
  description:? string,
};

export type Operation = {
  method: Method,
  path: string,
  description?: string,
  body?: Body,
  parameters: Array<Parameter>,
  responses: Array<Response>,
};

export type Resource = {
  type: string,
  plural: string,
  path?: string,
  description?: string,
  operations: Array<Operation>,
};

export type Service = {
  name: string,
  organization: Organization,
  application: Application,
  namespace: string,
  version: string,
  headers: Array<Header>,
  imports: Array<Import>,
  enums: Array<Enum>,
  unions: Array<Union>,
  models: Array<Model>,
  resources: Array<Resource>,
};
