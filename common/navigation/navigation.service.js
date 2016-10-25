class AcnfNavigationService {
    constructor ($rootScope) {
        this.$rootScope = $rootScope;
    }

    otherwise (path) {
        this.$rootScope.defaultPath = '/' + path;
    }
    
    static serviceFactory($rootScope){
        return new AcnfNavigationService($rootScope);
    }
}

angular.module('acnfFramework.common').factory('$acnfNavigation', AcnfNavigationService.serviceFactory);