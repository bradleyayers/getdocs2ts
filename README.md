# getdocs2ts

This is a utility that transforms code documented with [getdocs][]-style doc comments into TypeScript definition files

[getdocs]: https://github.com/marijnh/getdocs

# Usage

There is no CLI, so you must write a script. To generate type definitions for `prosemirror-*`, use the following code:

```javascript
const PM_BASE_PATH = 'path-to-prosemirror-repository/'
const OUT_DIR = 'path-to-DefinitelyTyped-repository/'
const getdocs2ts = require('getdocs2ts').default

const modules = [
    'model', 'transform', 'state', 'view', 'keymap', 'inputrules', 'history', 'collab', 'commands',
    'gapcursor', 'schema-basic', 'schema-list', 'menu', 'markdown'
]
getdocs2ts(
    modules.map(repo => {
        const packageJson = fs.readFileSync(PM_BASE_PATH + repo + "/package.json", "utf8")
        const version = JSON.parse(packageJson).version.match(/^\d+\.\d+/)[0]
        return {
        name: 'prosemirror-' + repo,
        srcFiles: PM_BASE_PATH + repo + '/src/*.js',
        outFile: OUT_DIR + 'prosemirror-'+repo+'/index.d.ts',
        header:
            '// Type definitions for prosemirror-' + repo + ' ' + version + '\n' +
            '// Project: https://github.com/ProseMirror/prosemirror-' + repo + '\n' +
            '// Definitions by: Bradley Ayers <https://github.com/bradleyayers>\n' +
            '//                 David Hahn <https://github.com/davidka>\n' +
            '//                 Tim Baumann <https://github.com/timjb>\n' +
            '// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped\n' +
            '// TypeScript Version: 2.1\n\n' +
            '// IMPORTANT\n' +
            '// This file was generated by https://github.com/bradleyayers/getdocs2ts. Please do not edit manually.\n' +
            '// When you find an error in these declarations, fix the getdocs comment upstream or \'getdocs2ts\', then regenerate.\n\n'
        }
    }),
    {
        RegExp: {},
        Error: {},
        Node: { replaceBy: 'ProsemirrorNode' },
        OrderedMap: { sourceModule: { name: 'orderedmap', isWholeModule: true } },
        MarkdownIt: { sourceModule: { name: 'markdown-it' } },
        'dom.Document': { replaceBy: 'Document' },
        'dom.DocumentFragment': { replaceBy: 'DocumentFragment' },
        'dom.Element': { replaceBy: 'HTMLElement' },
        'dom.Event': { replaceBy: 'Event' },
        'dom.KeyboardEvent': { replaceBy: 'KeyboardEvent' },
        'dom.MouseEvent': { replaceBy: 'MouseEvent' },
        'dom.MutationRecord': { replaceBy: 'MutationRecord' },
        'dom.Node': { replaceBy: 'Node' },
        DOMOutputSpec: {
            code: (
`export interface DOMOutputSpecArray {
  0: string;
  1?: DOMOutputSpec | 0 | { [attr: string]: string };
  2?: DOMOutputSpec | 0;
  3?: DOMOutputSpec | 0;
  4?: DOMOutputSpec | 0;
  5?: DOMOutputSpec | 0;
  6?: DOMOutputSpec | 0;
  7?: DOMOutputSpec | 0;
  8?: DOMOutputSpec | 0;
  9?: DOMOutputSpec | 0;
}
export type DOMOutputSpec
  = string
  | Node
  | DOMOutputSpecArray;`)
        }
    }
)
```

# Contributing

Build and run tests:

```
npm run build
npm run test
```
