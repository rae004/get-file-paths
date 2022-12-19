# Get File Paths
[![npm Package](https://img.shields.io/npm/v/@rae004/get-file-paths.svg)](https://www.npmjs.org/package/@rae004/get-file-paths) 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rae004/get-file-paths/blob/main/LICENSE) 
![node](https://img.shields.io/node/v/@rae004/get-file-paths)
![Release Workflow](https://github.com/rae004/get-file-paths/actions/workflows/release-package.yml/badge.svg)

[//]: # (![Node.js CI]&#40;https://github.com/fpsqdb/zip-lib/workflows/Node.js%20CI/badge.svg&#41;)

# Install

### npm
 `npm i @rae004/get-file-paths`

### yarn
`yarn add @rae004/get-file-paths`

# Basic Usage

## Get All files in directory with default options
```typescript
import { getFilePaths } from '@rae004/get-file-paths';

const paths = await getFilePaths('./')
```

#### output:
```
[
  {
    fullPath: '/Users/daUser/projects/get-file-paths/package.json',
    relativePath: 'Users/daUser/projects/get-file-paths/package.json',
    fileName: 'package.json'
  }
  // ...Other File objects
]
```

## Get All files with a relative root of projects
### don't include relative root in relativePath
```typescript
import { getFilePaths } from '@rae004/get-file-paths';

const paths = await getFilePaths('./', {
    relativeRoot: 'projects', 
    includeRelativeRoot: false 
})
```

#### output:
```
[
  {
    fullPath: '/Users/rae004/projects/get-file-paths/package.json',
    relativePath: 'get-file-paths/package.json',
    fileName: 'package.json'
  }
]
```

### include relative root in relativePath
```typescript
import { getFilePaths } from '@rae004/get-file-paths';

const paths = await getFilePaths('./', {
    relativeRoot: 'projects', 
    includeRelativeRoot: true 
})
```

#### output:
```
[
  {
    fullPath: '/Users/rae004/projects/get-file-paths/package.json',
    relativePath: 'projects/get-file-paths/package.json',
    fileName: 'package.json'
  }
]
```

### include leading slash in relativePath & fileName
```typescript
import { getFilePaths } from '@rae004/get-file-paths';

const paths = await getFilePaths('./', {
    relativeRoot: 'projects', 
    removeLeadingSlash: false
})
```

#### output:
```
[
  {
    fullPath: '/Users/rae004/projects/get-file-paths/package.json',
    relativePath: '/get-file-paths/package.json',
    fileName: '/package.json'
  },
]
```

# With typescript
```typescript

```