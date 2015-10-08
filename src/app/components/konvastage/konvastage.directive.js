
export default class KonvastageDirective {
    constructor () {
        'ngInject';

        let directive = {
            restrict: 'E',
            template: '<div id="kanvas_stage"></div>',
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
    constructor (KonvastageService) {
        'ngInject';

        KonvastageService.init('kanvas_stage');
    }
}
