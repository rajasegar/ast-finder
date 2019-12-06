import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from 'ast-finder/config/environment';

export default Controller.extend({

  customize: service(),
  emberVersion: computed(function() {
    return ENV.pkg.devDependencies['ember-source'];
  }),
  nodeFinderVersion: computed(function() {
    return ENV.pkg.dependencies['ast-node-finder'];
  }),
  actions: {
    toggleDarkMode() {
      this.customize.toggleDarkMode();
    }
  }
});
