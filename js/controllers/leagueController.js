app.controller("leagueController", [
    "$scope",
    "mainService",
    ($scope, mainService) => {
        $scope.players = mainService.players;
        $scope.results = mainService.results;
        $scope.league = mainService.league;

        window.addEventListener("league-updated", function (e) {
            $scope.players = mainService.players;
            $scope.results = mainService.results;
            $scope.league = mainService.league;
        });
    },
]);
