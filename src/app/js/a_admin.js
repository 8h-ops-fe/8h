var admin = angular.module('adminModule', []);

admin.controller('admin', ['$scope', 'ajax', function($scope, ajax) {
    myRadio('state');

    var url = 'staff/query';
    var data = {
        pageNum: 0,
        pageSize: 10
    };

    ajax.post(url, data, function(data){
        $scope.data = data;
    });
}]);
