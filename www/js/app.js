angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])

.directive('noScroll', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $element.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
})


.factory('instagram', ['$http', function($http){
    return $http.jsonp('https://api.instagram.com/v1/media/popular?client_id=fa127354e66d4c8da164d92edd18ca66&callback=JSON_CALLBACK')
    .success(function(result) {
        return result;
    });
}])

.controller('lawCardsCtrl', ['$scope', 'instagram', function($scope, instagram){

    instagram.success(function(result) {
        $scope.medias = result.data;
    });

    $scope.cards = [];

    // $scope.addCard = function(i) {
    //     var newCard = $scope.medias[Math.floor(Math.random() * $scope.medias.length)];
    //     newCard.id = Math.random();
    //     $scope.cards.push(angular.extend({}, newCard));
    // }
    //
    // for(var i = 0; i < 3; i++) $scope.addCard();

    $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
    };

    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
    };

    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
        console.log('Card removed');
    };

}]);
