var after = angular.module('afterModule', []);

after.controller('after', ['$scope', 'ajax', function($scope, ajax) {
    myRadio('type');
    myRadio('state');
    myRadio('result');



    var url = 'afterSale/query';
    var data = {
        pageNum: 0,
        pageSize: 10
    };

    ajax.post(url, data, function(data){
        $scope.data = data;
    });
}]);