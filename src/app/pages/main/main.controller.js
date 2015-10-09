
export default class MainController {
    constructor(KonvastageService, $scope, $state) {
        'ngInject';

        this.$state = $state;
        this.Math = Math;
        this.KonvastageService = KonvastageService;
        this.optimize = false;

        $scope.$on('KonvastageService:onSceneChanged', () => {
            $scope.$apply(() => {
                this.scene = KonvastageService.scene;
                this.scene.pointsAreIncorrect = KonvastageService.pointsAreIncorrect;
            });
        });
    }

    resetScene() {
        this.KonvastageService.reset();
        this.scene = {};
    }

    goAbout() {
        this.$state.go('about');
    }
}
