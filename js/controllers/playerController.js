app.controller("playerController", [
    "$scope",
    "mainService",
    ($scope, mainService) => {
        $scope.players = mainService.players;
        $scope.results = mainService.results;
        $scope.league = mainService.league;

        $scope.addPlayer = (player) => {
            mainService.findPlayer(player.name);

            if(mainService.findPlayer(player.name)) {
                return alert('a player already exists with the name ' + player.name)
            }

            player.id = mainService.players.length + 1;
            mainService.players.push(player);
            $scope.newPlayer = {};
        };
    },
]);
