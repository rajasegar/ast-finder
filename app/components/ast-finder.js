import Component from '@ember/component';
import { babel as babelFinder, glimmer }  from 'ast-node-finder';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import recast from "recast";
import etr from "ember-template-recast";
import recastBabel from "recastBabel";
import recastBabylon from "recastBabylon";

const j = recast.types.builders; // eslint-disable-line
const b = etr.builders; // eslint-disable-line

const { dispatchNodes } = babelFinder;

function filterAstNodes(key, value) {
  return ['loc', 'tokens'].includes(key) ? undefined : value;
}
export default Component.extend({

  customize: service(),
  theme: computed.reads('customize.theme'),
  parse: computed("parser", function() {
    let parse = recast.parse;
    let _parser = this.get("parser");
    switch (_parser) {
      case "babylon":
        parse = recastBabylon.parse;
        break;
      case "babel":
        parse = recastBabel.parse;
        break;
      case "ember-template-recast":
        parse = etr.parse;
        break;
    }
    return parse;
  }),
  ast: computed('code', 'parse', function() {
    let parse = this.get('parse');
    let ast;
    try {
      ast = parse(this.get("code"));
    } catch (error) {
      console.error(error); // eslint-disable-line
      ast = {};
    }
    return JSON.stringify(ast, filterAstNodes, 2);
  }),

  pseudoAst: computed('code', 'parse', function() {

    let parse = this.get('parse');
    let ast = parse(this.get('code'));
    let _mode = this.get('mode');
    let str;
    switch(_mode) {
      case 'javascript':
        str = dispatchNodes(ast);
        break;

      case 'handlebars':
        str =  glimmer.dispatchNodes(ast);
        break;
    }
    return str;
  }),

  nodeApi: computed('pseudoAst', function() {
    let str = this.get('pseudoAst').join('\n//-----------------------\n');
    return recast.prettyPrint(recast.parse(str), { tabWidth: 2 }).code;
  }),

  output: computed('pseudoAst', function() {
    const sampleCode = '';
    let parse = this.get('parse');
    const outputAst = parse(sampleCode);  

    // Check the manifested api is working fine
    this.get('pseudoAst').forEach(n => outputAst.program.body.push(eval(n)));

    const output = print(outputAst, { quote: 'single'}).code;

    return  output;
  }),

  init() {
    this._super(...arguments);
    this.set('jsonMode',{ name: "javascript", json: true });
    this.set("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
  }

});
