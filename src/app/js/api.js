var eightUrl = 'http://8h-ops-dev.obaymax.com/';


app.factory('ajax',['$http', function($http){
    return {
        'post': function(url, data, success, error){
            var token = getCookie('token');
            var req = {
                method: 'POST',
                url: eightUrl+url,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Access-Auth-Token' : token,
                },
                xhrFields: {
                    withCredentials: true
                },
                data: data
            }
            $http(req)
            .success(function(data, status, headers, config){
                success && success(data, status, headers, config);
                console.log(data);
            })
            .error(function(msg){
                alert(msg.message);
            });
        },
        'get': function(url, data, success, error){
            var token = getCookie('token');
            var req = {
                method: 'GET',
                url: eightUrl+url,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Access-Auth-Token' : token,
                },
                xhrFields: {
                    withCredentials: true
                },
                data: data
            }
            $http(req)
            .success(function(data, status, headers, config){
                success && success(data, status, headers, config);
                console.log(data);
            })
            .error(function(msg){
                alert(msg.message);
            });
        }
    }
}]);