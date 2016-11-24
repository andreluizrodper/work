angular
.module("work")
.controller("memo", function($scope, $route, $routeParams, $location, $http){
    $scope.memo = "";
    $http.get("http://192.168.1.101:8086/memo?user_id=" + $.cookie("br.com.alrp.work")).then(function(response){
        if(response.data.data != null)
            $scope.memo = response.data.data.text;
    });
    $scope.saveMemo = function(){
        $http({
            "url": "http://192.168.1.101:8086/memo",
            "data": {"user_id":$.cookie("br.com.alrp.work"), "text": $("#memo textarea").val()},
            "method": "PUT"
        });
    }
});
