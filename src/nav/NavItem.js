// @flow

export type NavItem = {
  name: string,
  active?: boolean,
  type?: string,
  toHref?: string,
  items?: NavItem[],
};
