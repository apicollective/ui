type Service = {
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

type Organization = {
  key: string,
};

type Application = {
  key: string,
};

type Import = {
  uri: string,
  namespace: string,
  organization: Organization,
  application: Application,
  version: string,
  enums: Array<string>,
  unions: Array<string>,
  models: Array<string>,
};

type Enum = {
  name: string,
  plural: string,
  description?: string,
  values: Array<EnumValue>,
};

type EnumValue = {
  name: string,
  description?: string,
};

type Union = {
  name: string,
  plural: string,
  descriminator?: string,
  description?: string,
  types: Array<UnionType>,
};

type UnionType = {
  type: string,
  description?: string,
};

type Model = {
  name: string,
  plural: string,
  description?: string,
  fields: Array<Field>,
};

type Field = {
  name: string,
  type: string,
  description?: string,
  default?: string,
  required?: boolean,
  minimum?: number,
  maximum?: number,
  example?: string,
};

type Header = {
  name: string,
  type: string,
  required: boolean,
  description?: string,
  default?: string,
};

