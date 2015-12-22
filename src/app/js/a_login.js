angular.module('login', [])
.controller('login', ['$scope', '$http', function($scope, $http) {
    $scope.login = function(){
        var username = $scope.username,
            password = $scope.password;
        if( !username ){
            alert('用户名不能为空');
            return;
        }
        if( !password ){
            alert('密码不能为空');
            return;
        }
        $http.post(eightUrl+'/staff/login',{username: username, password: password})
        .success(function(data, status, headers, config){
            localStorage.token = data.accessToken;
            addCookie('token', data.accessToken);
            addCookie('id', data.id);
            addCookie('name', data.username);
            addCookie('roleId', data.roleId);
            window.location.href = 'index.html';
        })
        .error(function(json){
            $scope.error = json.message;
            $scope.bBlock = true;
        });
    };
}]);