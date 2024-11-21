# Url

JavaScript utility for effortless URL building.

## Table of Contents

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Exports](#exports)
  - [url](#url)
- [License](#license)

## Installation

### URLs

#### Github

```
"@yurkimus/url": "github:yurkimus/url"
```

#### Raw

```
"@yurkimus/url": "https://raw.githubusercontent.com/yurkimus/url/main/source/index.js"
```

## Dependencies

- @yurkimus/types

## Exports

### url

#### Definition:

```
url :: object -> URL
```

#### Example:

```javascript
url({ base: 'http://localhost', pathname: 'tasks' }) // => URL { ... }
```

## License

[MIT](LICENSE)
