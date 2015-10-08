import routerConfig from './index.route';

import './pages/main/main.module';
import './pages/about/about.module';

angular.module('geom', ['ui.router', 'app.pages.main', 'app.pages.about'])
  .config(routerConfig);
