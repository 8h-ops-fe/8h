var order = angular.module('orderModule', []);

order.controller('order', ['$scope', 'ajax', function($scope, ajax) {
    myRadio('status');
    var url = 'order/orderList';
    var data = {
        pageNum: 0,
        pageSize: 10
    };

    ajax.post(url, data, function(data){
        $scope.data = data;
    });
}]);