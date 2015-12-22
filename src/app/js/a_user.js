var user = angular.module('userModule', []);


user.controller('user', ['$scope', 'ajax', function($scope, ajax) {
    myRadio('state');
    var url = 'user/list';
    var data = {
        pageNum: 0,
        pageSize: 10
    };

    ajax.post(url, data, function(data){
        $scope.data = data;
    });



}]);