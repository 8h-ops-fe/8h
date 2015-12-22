var app = angular.module('app', [
    'ngRoute',
    'orderModule',
    'afterModule',
    'goodsModule',
    'userModule',
    'adminModule'
]);

app.controller('getname', ['$scope', function($scope){
    $scope.username = getCookie('name');
}])

app.controller('nav', ['$scope', '$location', function($scope, $location){
    $scope.path = $location.path();
    $scope.nav = [
        {
            class :'order-icon',
            href : '#/order',
            aClass : 'order icon1',
            name : '订单管理',
            path: '/order'
        },
        {
            class :'after-icon',
            href : '#/afterSale',
            aClass : 'after icon2',
            name : '售后管理',
            numClass : 'after-num',
            path: '/afterSale'
        },
        {
            class :'goods-icon',
            href : '#/goods',
            aClass : 'goods icon3',
            name : '商品管理',
            path: '/goods'
        },
        {
            class :'user-icon',
            href : '#/user',
            aClass : 'user icon4',
            name : '用户管理',
            path: '/user'
        },
        {
            class :'admin-icon',
            href : '#/admin',
            aClass : 'admin icon5',
            name : '系统管理',
            path: '/admin'
        }
    ];

    $scope.$on('$routeChangeSuccess', function(){
        $scope.path = $location.path();
    });
}])


.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/order',{
        templateUrl: '../html/common/order.html',
        controller: 'order'
    }).when('/afterSale',{
        templateUrl: '../html/common/afterSale.html',
        controller: 'after'
    }).when('/goods',{
        templateUrl: '../html/common/goods.html',
        controller: 'goods'
    }).when('/user',{
        templateUrl: '../html/common/user.html',
        controller: 'user'
    }).when('/admin',{
        templateUrl: '../html/common/admin.html',
        controller: 'admin'
    }).otherwise({
        redirectTo:'/order',
        controller: 'initOrder'
    });
}]);