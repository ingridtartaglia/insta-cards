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

.factory('lawService', ['$http', function($http){
    return {
        search: function(){
            var url = "http://www.camara.gov.br/SitCamaraWS/Proposicoes.asmx/ListarProposicoes?sigla=PL&numero=&ano=2015&datApresentacaoIni=01/10/2015&datApresentacaoFim=" +
            "&parteNomeAutor=&idTipoAutor=&siglaPartidoAutor=&siglaUFAutor=&generoAutor=&codEstado=&codOrgaoEstado=&emTramitacao=";
            return $http.get(url);
        }
    }
}])


.controller('lawCardsCtrl', ['$scope', 'lawService', function($scope, lawService){

    $scope.getLaws = function(){
        lawService.search()
        .then(function(proposicoes){
            $scope.proposicoes = proposicoes;
        });
    };

    $scope.cards = [];

    $scope.addCard = function(i) {
        var newCard = $scope.proposicoes[Math.floor(Math.random() * $scope.proposicoes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }

    for(var i = 0; i < 3; i++) $scope.addCard();

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
