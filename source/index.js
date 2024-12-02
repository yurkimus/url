import { curry } from '@yurkimus/curry'
import { is } from '@yurkimus/types'

/**
 * Construct URL
 *
 * @example
 * ```javascript
 * let Urls = {
 *  Frontend: url('http://frontend.localhost/'),
 *  Backend: url('http://backend.localhost/'),
 * }
 *
 * Urls.Frontend('tasks') // => http://frontend.localhost/tasks
 *
 * Urls.Backend('todos', { port: 3000 }) // => http://backend.localhost:3000/todos
 *
 * Urls.Backend('todos', { search: { id: 42 } }) // => http://backend.localhost:3000/todos?id=42
 *
 * url('http://localhost/user/', '42', { hash: 'info' }) // => 'http://localhost/user/42#info'
 *
 * url('http://localhost/', '') // => 'http://localhost/'
 * ```
 */
export let url = curry(
  (base, path, options) => {
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
  },
  2,
)
