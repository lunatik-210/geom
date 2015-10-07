import config from './index.config';
import routerConfig from './index.route';
import MainController from './main/main.controller';

import './components/konvastage/konvastage.module';

angular.module('geom', ['ngAnimate', 'restangular', 'ui.router', 'ui.keypress', 'mm.foundation', 'app.components.konvastage'])
  .config(config)
  .config(routerConfig)
  .controller('MainController', MainController);
