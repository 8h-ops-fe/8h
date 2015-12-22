var goods = angular.module('goodsModule', []);


goods.controller('goods', ['$scope', '$http', function($scope, $http) {
    myRadio('state');
}]);


