var beacons = angular.module('beaconFrameModule', []);

function mainController($scope, $http,$interval) {

    $interval(function(){
        $http.get('/beaconFrames/99999999999/last')
            .success(function(data) {
                $scope.beaconFrames = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    },1000);

}