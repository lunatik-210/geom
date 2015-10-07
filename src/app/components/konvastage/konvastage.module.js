import KonvastageDirective from './konvastage.directive';
import KonvastageService from './konvastage.service';

angular.module("app.components.konvastage", [])
    .directive('konvaStage', () => new KonvastageDirective())
    .service('KonvastageService', KonvastageService);
