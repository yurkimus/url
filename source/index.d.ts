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

interface url {
  (base: URLInit[0]): (path: string, options?: URLOptions) => URL

  (base: URLInit[0], path: string, options?: URLOptions): URL
}

export let url: url
