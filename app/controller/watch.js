angular
.module("work")
.controller("watch", function($scope, $interval){
    watchStatus = 0;
    $scope.time = [];
    $scope.time.hour = 0;
    $scope.time.minute = 0;
    $scope.time.second = 0;
    $scope.watch = function(){
        $("#watch").toggleClass("active");
        if(watchStatus == 1){
            watchStatus = 0;
            $interval.cancel(timer);
            $scope.time.hour = 0;
            $scope.time.minute = 0;
            $scope.time.second = 0;
        }else{
            watchStatus = 1;
            timer = $interval(function(){
                if($scope.time.second < 59){
                    $scope.time.second++;
                }else{
                    $scope.time.second = 0;
                    if($scope.time.minute < 59){
                        $scope.time.minute++;
                        if($scope.time.minute > 45){
                            $scope.notify("Hey, you should stop for 15 minutes!");
                            $("#watch").toggleClass("stop");
                        }else if($scope.time.minute == 0){
                            $scope.notify("Come on buddy your time out is over!");
                            $("#watch").toggleClass("stop");
                        }
                    }else{
                        $scope.time.minute = 0;
                        $scope.time.hour++;
                    }
                }
            }, 1000, false, true);
        }
    }
    $scope.notify = function(text){
        new Notification(text);
    }
});