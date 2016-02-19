angular
.module("work")
.controller("lists", function($scope){
    $scope.lists = [];
    $scope.newList = function(){
        if($(".new-list input").val() == "")
            return false;
        repeat = false;
        for(var a in $scope.lists){
            if($scope.lists[a].name == $(".new-list input").val())
                repeat = true;
        }
        if(repeat)
            return false;
        id = $scope.lists.length;
        $scope.lists[id] = [];
        $scope.lists[id].id = id;
        $scope.lists[id].name = $(".new-list input").val();
        $scope.lists[id].items = [];
        $(".new-list")[0].reset();
        $(".new-list input").blur();
    }
    $scope.newItem = function(id){
        if($(".new-item[name='" + id + "'] input").val() == "")
            return false;
        repeat = false;
        for(var a in $scope.lists[id].items){
            if($scope.lists[id].items[a].name == $(".new-item[name='" + id + "'] input").val())
                repeat = true;
        }
        if(repeat)
            return false;
        count = $scope.lists[id].items.length;
        $scope.lists[id].items[count] = [];
        $scope.lists[id].items[count].id = count;
        $scope.lists[id].items[count].name = $(".new-item[name='" + id + "'] input").val();
        $scope.lists[id].items[count].done = "";
        $(".new-item[name='" + id + "']")[0].reset();
        $(".new-item[name='" + id + "'] input").blur();
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