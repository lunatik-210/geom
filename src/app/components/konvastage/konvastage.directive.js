
const CONTAINER_NAME = 'kanvas_stage';

export default class KonvastageDirective {
    constructor () {
        'ngInject';

        let directive = {
            restrict: 'E',
            template: `<div id='${CONTAINER_NAME}'></div>`,
            scope: false,
            replace: true,
            controller: KonvastageController,
            controllerAs: 'konva',
            bindToController: true
        };

        return directive;
    }
}

class KonvastageController {
    constructor (KonvastageService, $window) {
        'ngInject';

        let w = angular.element(`#${CONTAINER_NAME}`).width();
        let h = $window.innerHeight;
        KonvastageService.init(CONTAINER_NAME, w, h);

        angular.element($window).bind('resize', function () {
            let w = angular.element(`#${CONTAINER_NAME}`).width();
            let h = $window.innerHeight;
            KonvastageService.reInit(CONTAINER_NAME, w, h);
        });
    }
}
