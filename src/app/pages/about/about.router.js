
export default function routerConfig ($stateProvider) {
    'ngInject';
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'app/pages/about/about.html'
    });
}
