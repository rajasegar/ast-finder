import Component from '@ember/component';
import { parse, print, types, prettyPrint } from 'recast';
import { findQuery }  from 'ast-node-finder';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const j = types.builders; // eslint-disable-line

// Sample code to test
const _code1 = `
hello();
let hello = "world";
export default function() {};
`;

const _code = `
foo.bar.baz();
`;

export default Component.extend({

  customize: service(),
  code: _code,
  theme: computed.reads('customize.theme'),
  ast: computed('code', function() {
    let ast = parse(this.get('code'));
    console.log(ast.program.body); // eslint-disable-line
    return JSON.stringify(ast);
  }),

  pseudoAst: computed('code', function() {

    let ast = parse(this.get('code'));
    let str  = '';

    str = ast.program.body.map(node => {
      switch(node.type) {
        case 'ExpressionStatement':
          return findQuery(node.expression);

        case 'VariableDeclaration':
          return findQuery(node.declarations[0]);

        default:
          console.log('pseudoAst => ', node.type); // eslint-disable-line
          return '';
      }
    });


    return str;
  }),

  nodeApi: computed('pseudoAst', function() {
    let str = this.get('pseudoAst').join('\n//-----------------------\n');
        return prettyPrint(parse(str), { tabWidth: 2 }).code;
  }),

  output: computed('pseudoAst', function() {
    const sampleCode = '';
    const outputAst = parse(sampleCode);  

    // Check the manifested api is working fine
    this.get('pseudoAst').forEach(n => outputAst.program.body.push(eval(n)));

    const output = print(outputAst, { quote: 'single'}).code;

    return  output;
  }),

  init() {
    this._super(...arguments);
    this.set('jsonMode',{ name: "javascript", json: true });
  }

});
