// @flow
import type {
  Application,
  Organization,
  Service,
} from 'generated/version/ServiceType';

// Extend React Router for Params match
export type Match<T> = {|
  params: T,
  isExact: boolean,
  path: string,
  url: string,
|};

export type ParamsHome = {||};

export type ParamsOrg = {|
  organizationKey: string,
|};

export type ParamsApp = {|
  organizationKey: string,
  applicationKey: string,
|};

export type ParamsResource = {|
  organizationKey: string,
  applicationKey: string,
  resource: string,
  method: string,
  path: string,
|};

export type ParamsModel = {|
  organizationKey: string,
  applicationKey: string,
  model: string,
|};

export type ParamsDoc = {|
  organizationKey: string,
  documentationKey: string,
|};

export type Params =
  | ParamsHome
  | ParamsOrg
  | ParamsApp
  | ParamsResource
  | ParamsModel
  | ParamsDoc;

export type PropsHome = {|
  organizations: Organization[],
|};

export type PropsOrg = {|
  match: Match<ParamsOrg>,
  applications: Application[],
|};

export type PropsApp = {|
  match: Match<ParamsApp>,
  service: Service,
|};

export type Props = PropsHome | PropsOrg | PropsApp;
