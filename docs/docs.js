// Modulo apenas a nivel de Documentação, não necessita classes ou ES6
(function (angular) {
    angular.module('acnfFramework.docs', []).config(function($urlRouterProvider, $locationProvider, $stateProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'docs/home/home.html',
            controller: 'HomeController as vm'
        });
    });
})(window.angular);