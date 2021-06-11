import EmberRouter from '@ember/routing/router';
import config from 'ast-finder/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {});

export default Router;
