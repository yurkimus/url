import { is } from '@yurkimus/types'

/**
 * @typedef {object} URLOptions
 * @prop {string} [username]
 * @prop {string} [password]
 * @prop {string} [pathname]
 * @prop {string} [hash]
 * @prop {string | number} [port]
 * @prop {string | object | any[] | URLSearchParams} [search]
 *
 * @param {string | URL} base
 * @param {string} path
 * @param {URLOptions} [options]
 */
export let url = (base, path, options) => {
  if (!['String', 'URL'].some(kind => is(kind, base)))
    throw new TypeError(`Parameter 'base' must be of type 'String' or 'URL'.`)

  if (!is('String', path))
    throw new TypeError(`Parameter 'path' must be of type 'String'.`)

  let instance = new URL(path, base)

  if (!is('Undefined', options)) {
    if (!is('Object', options))
      throw new TypeError(`Parameter 'options' must be of type 'Object'.`)
    else
      for (let option in options)
        switch (option) {
          case 'username':
          case 'password':
          case 'pathname':
          case 'hash':
            if (!is('String', options[option]))
              throw new TypeError(
                `Parameter 'options.${option}' must be of type 'String'.`,
              )
            else
              instance[option] = options[option]
            break

          case 'port':
            if (
              !['String', 'Number']
                .some(kind => is(kind, options[option]))
            )
              throw new TypeError(
                `Parameter 'options.${option}' must be of type 'String'.`,
              )
            else
              instance[option] = options[option]
            break

          case 'search':
            if (
              !['Object', 'String', 'Array', 'URLSearchParams']
                .some(kind => is(kind, options[option]))
            )
              throw new TypeError(
                `Parameter 'options.${option}' must be of types: 'Object', 'String', 'Array' or 'URLSearchParams'.`,
              )
            else
              instance[option] = new URLSearchParams(options[option])
            break

          default:
            throw new TypeError(
              `Property '${option}' on 'options' is not allowed.`,
            )
        }
  }

  return instance
}
