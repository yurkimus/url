export type Options =
  & { base: string | Location | URL | HTMLAnchorElement }
  & Pick<
    URL,
    | 'protocol'
    | 'port'
    | 'pathname'
    | 'search'
    | 'hash'
    | 'username'
    | 'password'
  >
