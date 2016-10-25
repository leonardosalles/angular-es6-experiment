class AeSidebarService {
    constructor ($rootScope) {
        this.$rootScope = $rootScope;
        this.$rootScope.sidebar = {};
    }

    setItems (items) {
        this.$rootScope.sidebar.items = items;
    }
    
    setParent (parent) {
        this.$rootScope.sidebar.parent = parent ? parent + '/' : '';
    }
    
    static serviceFactory($rootScope){
        return new AeSidebarService($rootScope);
    }
}

angular.module('acnfFramework.common').factory('$aeSidebar', AeSidebarService.serviceFactory);