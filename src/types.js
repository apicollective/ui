// Extend React Router for Params match
export type Match<T> = {|
  params: T,
  isExact: boolean,
  path: string,
  url: string,
|};
