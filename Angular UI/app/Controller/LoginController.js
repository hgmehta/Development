main.controller('LoginController', ['$http',
    '$scope',

    function ($scope,$http) {

        $scope.Email = "";
        $scope.Password = "";

    }]);

main.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});