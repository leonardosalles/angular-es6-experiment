let dependencies = [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngStorage',
    'ngLocale',
    'ngResource',
    'ngMessages',
    'pascalprecht.translate',
    'snap',
    'acnfFramework.controllers',
    'acnfFramework.common',
    'acnfFramework.components'
];

angular.module('acnf.framework', dependencies).config(($stateProvider, $locationProvider, snapRemoteProvider, $uibTooltipProvider, $urlRouterProvider) => {
    $stateProvider.state('403', {
        url: '/403',
        template: '<div class="acnf-navigation-error"><h1>403 - Acesso Proibido!</h1><p>Você não tem acesso a este módulo ou recurso</p></div>',
        controller: 'AcnfNavigationController'
    });

    $stateProvider.state('404', {
        url: '/404',
        template: '<div class="acnf-navigation-error"><h1>404 - Não Econtrada!</h1><p>Não econtramos a página solicitada!</p></div>',
        controller: 'AcnfNavigationController'
    });

    $stateProvider.state('500', {
        url: '/500',
        template: '<div class="acnf-navigation-error"><h1>500 - Erro Inesperado!</h1><p>Verifique o erro junto ao nosso suporte!</p></div>',
        controller: 'AcnfNavigationController'
    });
    
    $locationProvider.html5Mode(true);

    snapRemoteProvider.globalOptions = {
        disable: 'right'
    };

    $uibTooltipProvider.options({ appendToBody: true }); 
    
    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get('$state');

        $state.go('404');
    });
})
.run(($rootScope, $acnfSecurity, $location, $state) => {
    let stateGo = (event, state) => {
        event.preventDefault();
        $location.path('/' + state);
        $rootScope.$broadcast('acnf.navigationError');
        return $state.go(state);
    };
    
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
        if (toState.name === '403' || toState.name === '404' || toState.name === '500') {
            return $rootScope.$broadcast('acnf.navigationError');
        }

        if(angular.isDefined(toState.roles) && !$acnfSecurity.hasRoles(toState.roles)) {
            return stateGo(event, '403');
        }
    });

    $rootScope.$on('$locationChangeStart', () => {
        if ($location.path() === '/' && angular.isDefined($rootScope.defaultPath)) {
            $location.path($rootScope.defaultPath);
        }
    });
});