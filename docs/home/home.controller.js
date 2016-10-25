(function (angular) {
    'use strict';

    angular.module('acnfFramework.docs').controller('HomeController', HomeController);

    function HomeController ($dialog, $acnfSidebar) {
        let vm = this;
        vm.openDialog = openDialog;
        
        function openDialog () {
            $dialog.create({templateUrl: 'docs/home/dialog.html'}, function (dialog) {
                dialog.open().then(function (someValue) {
                    if (someValue) {
                      $scope.messages.push(someValue);
                    }
                });
            });
        }

        let sidebar = [
            {header: 'Componentes'},
            {text: 'Clientes e Fornecedores', href: 'clientes-e-fornecedores', icon: 'user'},
            {text: 'Produtos', href: 'produtos', icon: 'tags'},
            {text: 'Relatórios', href: 'relatorios', icon: 'file-text-o'},
            {text: 'Configurações', href: 'configuracoes', icon: 'cog'},
            {header: 'Serviços'},
            {text: 'Configurações', href: 'configuracoes', icon: 'cog'},
        ];

        $acnfSidebar.setItems(sidebar);
    }
})(window.angular);