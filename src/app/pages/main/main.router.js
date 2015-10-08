
export default function routerConfig ($stateProvider) {
    'ngInject';
    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'app/pages/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
    });
}
