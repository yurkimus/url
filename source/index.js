import { is } from '@yurkimus/types'

/**
 * @param {Pick<URL, 'protocol' | 'hostname' | 'port' | 'pathname' | 'search' | 'hash' | 'username' | 'password'>} init
 */
export let url = init => {
  if (!is('Object', init))
    throw new TypeError(`Parameter 'init' must be of 'Object' type.`)

  if (!('protocol' in init))
    throw new TypeError(`Parameter 'init.protocol' must be presented.`)

  if (!is('String', init.protocol))
    throw new TypeError(`Parameter 'init.protocol' must be of type 'String'.`)

  if (!('hostname' in init))
    throw new TypeError(`Parameter 'init.hostname' must be presented.`)

  if (!is('String', init.hostname))
    throw new TypeError(`Parameter 'init.hostname' must be of type 'String'.`)

  let instance = new URL(
    init.pathname ?? '',
    init.protocol
      + '://'
      + init.hostname,
  )

  for (let option of ['pathname', 'protocol', 'hostname'])
    delete init[option]

  for (let option in init) {
    switch (option) {
      case 'search':
        instance.search = new URLSearchParams(init.search)
        break

      case 'port':
      case 'pathname':
      case 'username':
      case 'password':
      case 'hash':
        instance[option] = init[option]
        break

      default:
        throw new TypeError(`Options '${option}' is not allowed.`)
    }
  }

  return instance
}
