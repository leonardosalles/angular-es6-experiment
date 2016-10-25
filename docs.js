(function () {
    var dependencies = [
        'ui.router',
        'ui.bootstrap',
        'ngSanitize',
        'ngStorage',
        'ngLocale',
        'ngResource',
        'ngMessages',
        'pascalprecht.translate',
        'snap',
        'ae.components',
        'ae.common',
        'ae.docs'
    ];

    angular.module('ae.documentation', dependencies)
    .config(function ($dialogProvider) {
        $dialogProvider.openAnimation = 'bounceInDown';
        $dialogProvider.closeAnimation = 'bounceOutUp';
    }).run(($acnfHeader) => {
        $acnfHeader.setTitle('ACNF Framework');
        $acnfHeader.setVersion('0.0.1');
    });

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['acnf.documentation']);
    });
})();