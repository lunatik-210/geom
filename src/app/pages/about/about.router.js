
export default function routerConfig ($stateProvider, $urlRouterProvider) {
    'ngInject';
    $urlRouterProvider.when('/about', '/about/task');

    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'app/pages/about/about.html'
    });

    $stateProvider.state('about.task', {
        url: '/task',
        templateUrl: 'app/pages/about/templates/task.html'
    });

    $stateProvider.state('about.solution', {
        url: '/solution',
        templateUrl: 'app/pages/about/templates/solution.html'
    });

    $stateProvider.state('about.technologies', {
        url: '/technologies',
        templateUrl: 'app/pages/about/templates/technologies.html'
    });

    $stateProvider.state('about.architecture', {
        url: '/architecture',
        templateUrl: 'app/pages/about/templates/architecture.html'
    });

    $stateProvider.state('about.testing', {
        url: '/testing',
        templateUrl: 'app/pages/about/templates/testing.html'
    });

    $stateProvider.state('about.me', {
        url: '/me',
        templateUrl: 'app/pages/about/templates/me.html'
    });
}
