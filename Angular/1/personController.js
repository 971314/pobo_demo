/**
 * Created by pobo on 2016/12/8.
 */
var app = angular.module('myApp',[]);
app.controller('personCtrl',function ($scope) {
    $scope.firstname = 'john';
    $scope.lastname = 'doe';
    $scope.fullName = function () {
        return $scope.firstname + ' ' + $scope.lastname
    }
})