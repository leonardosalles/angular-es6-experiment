class AeHeader extends AeComponent {
    /*@ngInject*/

    constructor ($aeHeader, $state) {
        super();
        this.templateUrl = 'components/header/header.html';
        this.$aeHeader = $aeHeader;
        this.$state = $state;
    }

    getIconClass (icon) {
        return icon ? 'fa-' + icon : 'fa-bars';
    }

    getActiveClass (id) {
        if (this.$state.includes(id)) {
            return 'active';
        }
    }

    static directiveFactory ($aeHeader, $state) {
        return new AeHeader($aeHeader, $state);
    }
}

angular.module('ae.components').directive('aeHeader', AeHeader.directiveFactory);