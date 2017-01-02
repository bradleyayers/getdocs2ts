import { expect } from 'chai';
import 'mocha';
import { parse } from '../../src/getdocs/parser';
import { SyntaxKind } from '../../src/getdocs/scanner';

describe('parser', () => {
  check('a', 'an entity', {
    kind: 'Entity',
    name: 'a'
  });

  check('a.b', 'an entity name', {
    kind: 'Entity',
    name: 'a.b'
  });

  check('?a', 'an optional entity', {
    kind: 'Nullable',
    type: {
      kind: 'Entity',
      name: 'a'
    }
  });

  check('""', 'an empty string literal', {
    kind: 'StringLiteral',
    value: ''
  });

  check('"a"', 'an empty string literal', {
    kind: 'StringLiteral',
    value: 'a'
  });

  check('union<a>', 'a union with a single entity', {
    kind: 'Union',
    types: [
      {
        kind: 'Entity',
        name: 'a'
      }
    ]
  });

  check('union<a, b>', 'a union with two items', {
    kind: 'Union',
    types: [
      {
        kind: 'Entity',
        name: 'a'
      },
      {
        kind: 'Entity',
        name: 'b'
      }
    ]
  });

  check('?union<a>', 'an optional union', {
    kind: 'Nullable',
    type: {
      kind: 'Union',
      types: [
        {
          kind: 'Entity',
          name: 'a'
        }
      ]
    }
  });

  check('()', 'a call signature with no parameters and no return value', {
    kind: 'Function',
    parameters: [],
  });

  check('?()', 'an optional call signature', {
    kind: 'Nullable',
    type: {
      kind: 'Function',
      parameters: []
    }
  });

  check('() → a', 'a call signature with a return value but no parameters', {
    kind: 'Function',
    parameters: [],
    returnType: {
      kind: 'Entity',
      name: 'a'
    }
  });

  check('?() → a', 'an optional call signature with a return value', {
    kind: 'Nullable',
    type: {
      kind: 'Function',
      parameters: [],
      returnType: {
        kind: 'Entity',
        name: 'a'
      }
    }
  });

  check('(a) → b', 'a call signature with one parameter and a return value', {
    kind: 'Function',
    parameters: [
      {
        kind: 'Entity',
        name: 'a'
      }
    ],
    returnType: {
      kind: 'Entity',
      name: 'b'
    }
  });

  check('(?a) → b', 'a call signature with an optional parameter and a return value', {
    kind: 'Function',
    parameters: [
      {
        kind: 'Nullable',
        type: {
          kind: 'Entity',
          name: 'a'
        }
      }
    ],
    returnType: {
      kind: 'Entity',
      name: 'b'
    }
  });

  check('(a, ?b) → c', 'a call signature with multiple parameters', {
    kind: 'Function',
    parameters: [
      {
        kind: 'Entity',
        name: 'a'
      },
      {
        kind: 'Nullable',
        type: {
          kind: 'Entity',
          name: 'b'
        }
      }
    ],
    returnType: {
      kind: 'Entity',
      name: 'c'
    }
  });

  check('[a]', 'an array', {
    kind: 'Array',
    type: {
      kind: 'Entity',
      name: 'a'
    }
  });

  check('{}', 'an empty type literal', {
    kind: 'Object',
    members: []
  });

  check('{node: dom.Node, offset: number}', 'an type literal', {
    kind: 'Object',
    members: [
      {
        kind: 'ObjectMember',
        name: 'node',
        type: {
          kind: 'Entity',
          name: 'dom.Node'
        }
      },
      {
        kind: 'ObjectMember',
        name: 'offset',
        type: {
          kind: 'Entity',
          name: 'number'
        }
      }
    ]
  });

  function check(text: string, typeDescription: string, type: any) {
    it(`parses \`${text}\` as ${typeDescription}`, () => {
      expect(parse(text)).to.deep.equal(type);
    });
  }
});
