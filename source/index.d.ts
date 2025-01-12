type URLInit = ConstructorParameters<typeof URL>

type URLSearchParamsInit = ConstructorParameters<typeof URLSearchParams>

type URLOptions = {
  username?: string
  password?: string
  pathname?: string
  hash?: string
  port?: string
  search?: URLSearchParamsInit[0] | FormData
}

type Url = (base: URLInit[0], pathname: string, options?: URLOptions) => URL

export let url: Url
