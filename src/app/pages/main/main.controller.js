
export default class MainController {
    constructor(KonvastageService, $scope, $state) {
        'ngInject';

        this.$state = $state;
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
        this.scene = {};
    }

    goAbout() {
        this.$state.go('about');
    }
}
