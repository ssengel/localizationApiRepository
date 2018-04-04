var beacons = angular.module('beaconFrameModule', []);

function mainController($scope, $http,$interval) {

    var temp;

    $interval(function(){
        $http.get('/beaconFrames/allUsers')
            .success(function(data) {
                $scope.beaconFrames = data;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    },1000);

}