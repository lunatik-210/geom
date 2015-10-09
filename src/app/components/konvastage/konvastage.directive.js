
const CONTAINER_NAME = 'kanvas_stage';

export default class KonvastageDirective {
    constructor () {
        'ngInject';

        let directive = {
            restrict: 'E',
            template: `<div id='${CONTAINER_NAME}'></div>`,
            scope: {
                optimize: '='
            },
            replace: true,
            controller: KonvastageController,
            controllerAs: 'konva',
            bindToController: true
        };

        return directive;
    }
}

class KonvastageController {
    constructor (KonvastageService, $window, $scope) {
        'ngInject';

        this._initScene(KonvastageService, $window);

        angular.element($window).bind('resize', () => {
            this._reInitScene(KonvastageService, $window);
        });

        $scope.$watch(() => this.optimize, () => {
            $scope.$$postDigest(() => {
                KonvastageService.setOptimization(this.optimize);
                this._reInitScene(KonvastageService, $window);
            });
        });
    }

    _initScene(KonvastageService, $window){
        let w = angular.element(`#${CONTAINER_NAME}`).width();
        let h = $window.innerHeight;
        KonvastageService.init(CONTAINER_NAME, w, h);        
    }

    _reInitScene(KonvastageService, $window) {
        let w = angular.element(`#${CONTAINER_NAME}`).width();
        let h = $window.innerHeight;
        KonvastageService.reInit(CONTAINER_NAME, w, h);
    }
}
