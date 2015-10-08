
export default class MainController {
    constructor(KonvastageService, $scope) {
        'ngInject';

        this.Math = Math;

        $scope.$on('KonvastageService:onSceneChanged', () => {
            $scope.$apply(() => {
                this.scene = KonvastageService.scene;
            });
        });
    }
}
