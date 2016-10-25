class AcnfHeaderService {
    constructor ($rootScope) {
        this.$rootScope = $rootScope;
        this.$rootScope.header = {};
    }

    setTitle (title) {
        this.$rootScope.header.title = title;
    } 

    setLogo (path) {
        this.$rootScope.header.logo = path;
    } 

    setMenuItems (items) {
        this.$rootScope.header.menuItems = items;
    }

    setVersion (version) {
        this.$rootScope.header.version = version;
    }
    
    static serviceFactory($rootScope){
        return new AcnfHeaderService($rootScope);
    }
}

angular.module('acnfFramework.common').factory('$acnfHeader', AcnfHeaderService.serviceFactory);