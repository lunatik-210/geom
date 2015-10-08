
export default class MainController {
    constructor(KonvastageService, $scope) {
        'ngInject';

        $scope.$on('KonvastageService:onSceneChanged', () => {
            $scope.$apply(() => {
                this.scene = KonvastageService.scene;
            });
        });
    }
}
