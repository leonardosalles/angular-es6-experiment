class AeSidebar extends AeComponent {
    /*@ngInject*/

    constructor () {
        super();
        this.restrict = 'E';
        this.templateUrl = 'components/sidebar/sidebar.html';
    }

    getIconClass (icon) {
        return icon ? 'fa-' + icon : 'fa-bars';
    }
    
    historyBack () {
        history.go(-2);
    }
    
    static directiveFactory () {
        AeSidebar.instance = new AeSidebar();
        return AeSidebar.instance;
    }
}

angular.module('ae.components').directive('aeSidebar', AeSidebar.directiveFactory);