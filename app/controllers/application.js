import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import ENV from 'ast-finder/config/environment';
import PARSERS from 'ast-finder/constants/parsers';

// Sample code to test
const jscode = `foo.bar()`;

const hbscode = `{{#common/accordion-component data-test-accordion as |accordion|}}
  block
{{/common/accordion-component}}`;

const modes = {
  JavaScript: 'javascript',
  Handlebars: 'handlebars',
};

export default class ApplicationControl extends Controller {
  @service customize;

  @tracked language = 'JavaScript';
  @tracked parser = 'recast';

  get parsers() {
    return PARSERS.find((p) => p.name === this.language).parsers.map(
      (p) => p.name
    );
  }

  get parserVersion() {
    let _lang = PARSERS.find((l) => l.name === this.language);
    let _parser = _lang.parsers.find((p) => p.name === this.parser);
    return _parser.version;
  }

  get emberVersion() {
    return ENV.pkg.devDependencies['ember-source'];
  }

  get nodeFinderVersion() {
    return ENV.pkg.dependencies['ast-node-finder'];
  }

  get mode() {
    return modes[this.language];
  }

  get sampleCode() {
    if (this.language === 'JavaScript') {
      return jscode;
    } else {
      return hbscode;
    }
  }
  constructor() {
    super(...arguments);
    this.languages = PARSERS.map((p) => p.name);
  }

  @action toggleDarkMode() {
    this.customize.toggleDarkMode();
  }

  @action updateLanguage(evt) {
    this.language = evt.target.value;
    this.parser = PARSERS.find((l) => l.name === this.language).parsers[0].name;
  }

  @action updateParser(evt) {
    this.parser = evt.target.value;
  }
}
