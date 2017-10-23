/**
 * Created by pobo on 2016/12/8.
 */
angular.module('myApp',[]).controller('namesCtrl',function ($scope) {
    $scope.names = [
        {name:'jani',country:'norway'},
        {name:'hege',country:'sweden'},
        {name:'kai',country:'denmark'}
    ]
});