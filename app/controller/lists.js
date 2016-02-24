angular
.module("work")
.controller("lists", function($scope, $http){
    $scope.lists = [];
    $http.get("http://198.175.125.21:8086/list?user_id=" + $.cookie("br.com.alrp.work")).then(function(response){
        $scope.lists = response.data.data;
        for(var a in response.data.data){
            $scope.lists[a].name = response.data.data[a].description;
            $scope.lists[a].index = a;
            $scope.lists[a].id = response.data.data[a]._id;
            $scope.lists[a].items = [];    
            $http.get("http://198.175.125.21:8086/task?list_id=" + response.data.data[a].id).then(function(response){
                if(response.data.data[0] == undefined)
                    return;
                for(var c in $scope.lists){
                    if($scope.lists[c].id == response.data.data[0].list_id)
                        index = c;
                }
                for(var b in response.data.data){
                    $scope.lists[index].items[b] = [];
                    $scope.lists[index].items[b].id = response.data.data[b]._id;
                    $scope.lists[index].items[b].name = response.data.data[b].description;
                    //$scope.lists[index].items[b].done = response.data.data[b].description;
                }
            });
        }
    });
    $scope.newList = function(){
        if($(".new-list input").val() == "")
            return false;
        repeat = false;
        for(var a in $scope.lists){
            if($scope.lists[a].description == $(".new-list input").val())
                repeat = true;
        }
        if(repeat)
            return false;
        $http.post("http://198.175.125.21:8086/list",{"user_id": $.cookie("br.com.alrp.work"), "description": $(".new-list input").val()})
            .then(function(response){
            id = $scope.lists.length;
            $scope.lists[id] = [];
            $scope.lists[id].index = id;
            $scope.lists[id].id = response.data.data._id;
            $scope.lists[id].name = response.data.data.description;
            $scope.lists[id].items = [];
            $(".new-list")[0].reset();
            $(".new-list input").blur();    
        });
    }
    $scope.newItem = function(id, index){
        if($(".new-item[name='" + index + "'] input").val() == "")
            return false;
        repeat = false;
        for(var a in $scope.lists[index].items){
            if($scope.lists[index].items[a].name == $(".new-item[name='" + index + "'] input").val())
                repeat = true;
        }
        if(repeat)
            return false;
        $http.post("http://198.175.125.21:8086/task", {"list_id": id, "description": $(".new-item[name='" + index + "'] input").val()})
            .then(function(response){
            count = $scope.lists[index].items.length;
            $scope.lists[index].items[count] = [];
            $scope.lists[index].items[count].index = count;
            $scope.lists[index].items[count].id = response.data.data._id;
            $scope.lists[index].items[count].name = response.data.data.description;
            $scope.lists[index].items[count].done = "";
            $(".new-item[name='" + index + "']")[0].reset();
            $(".new-item[name='" + index + "'] input").blur();
        });
    }
    $scope.done = function(id, item_id){
        if($scope.lists[id].items[item_id].done == "")
            $scope.lists[id].items[item_id].done = "done";
        else
            $scope.lists[id].items[item_id].done = "";
    }
    $scope.itemRemove = function(id, item_id){
        $scope.lists[id].items.splice(item_id, 1);
    }
    $scope.listRemove = function(id){
        $scope.lists.splice(id, 1);
    }
});