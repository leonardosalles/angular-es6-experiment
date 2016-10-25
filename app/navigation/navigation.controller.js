class AcnfNavigationController {
    /*@ngInject*/
    
    constructor ($rootScope, $acnfSidebar) {
        let items = [
            {header: 'Ações'},
            {text: 'Início', href: 'inicio', icon: 'home'},
            {text: 'Voltar', back: true, icon: 'chevron-left'}
        ];

        $acnfSidebar.setItems(items);
        $acnfSidebar.setParent(null);
    }
}

angular.module('acnfFramework.controllers').controller('AcnfNavigationController', AcnfNavigationController);