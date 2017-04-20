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
  name: string,
  description?: string,
};

export type Application = {
  key: string,
  name: string,
  description?: string,
};

export type Import = {
  uri: string,
  namespace: string,
  organization: Organization,
  application: Application,
  version: string,
  enums: string[],
  unions: string[],
  models: string[],
};

export type EnumValue = {
  name: string,
  description?: string,
};

export type Enum = {
  name: string,
  plural: string,
  description?: string,
  values: EnumValue[],
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
  types: UnionType[],
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
  fields: Field[],
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

export type Integer = {
  value: number,
}

export type Code = {
  integer: Integer,
};

export type Response = {
  code: Code,
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
  parameters: Parameter[],
  responses: Response[],
};

export type Resource = {
  type: string,
  plural: string,
  path?: string,
  description?: string,
  operations: Operation[],
};

export type Service = {
  name: string,
  organization: Organization,
  application: Application,
  namespace: string,
  version: string,
  headers: Header[],
  imports: Import[],
  enums: Enum[],
  unions: Union[],
  models: Model[],
  resources: Resource[],
};
