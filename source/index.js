import { is } from '@yurkimus/types'

/**
 * @param {import('./index.d.ts').Options} options
 */
export let url = options => {
  if (!is('Object', options))
    throw new TypeError(`'options' must be of 'Object' type.`)

  if (!is('String', options.base))
    throw new TypeError(`'base' must be of 'String' type.`)

  if (!URL.canParse(options.base))
    throw new TypeError(`'base' must be URL-like.`)

  let instance = new URL(options.pathname ?? '', options.base)

  for (let option of ['base', 'pathname']) delete options[option]

  for (let option in options) {
    switch (option) {
      case 'search':
        instance.search = new URLSearchParams(options.search)
        break

      case 'hash':
      case 'port':
      case 'protocol':
      case 'username':
      case 'password':
        instance[option] = options[option]
        break

      default:
        throw new TypeError(`No predicate found for 'option': '${option}'.`)
    }
  }

  return instance
}
