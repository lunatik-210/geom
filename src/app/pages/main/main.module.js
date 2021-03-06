import routerConfig from './main.router';
import MainController from './main.controller';

import './../../components/konvastage/konvastage.module';

angular.module('app.pages.main', ['ngAnimate', 'ui.router', 'app.components.konvastage'])
  .config(routerConfig)
  .controller('MainController', MainController);
