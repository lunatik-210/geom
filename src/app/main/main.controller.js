
export default class MainController {
    constructor(KonvastageService, $scope) {
        'ngInject';

        this.Math = Math;
        this.KonvastageService = KonvastageService;

        $scope.$on('KonvastageService:onSceneChanged', () => {
            $scope.$apply(() => {
                this.scene = KonvastageService.scene;
            });
        });
    }

    resetScene() {
        this.KonvastageService.reset();
    }
}
