app.controller("resultController", [
    "$scope",
    "mainService",
    ($scope, mainService) => {
        $scope.players = mainService.players;
        $scope.results = mainService.results;
        $scope.league = mainService.league;

        $scope.addResult = (result) => {
            if (!result) {
                return;
            }
            const s1 = result.score_1;
            const s2 = result.score_2;

            function diff(num1, num2) {
                if (num1 > num2) {
                    return num1 - num2;
                } else {
                    return num2 - num1;
                }
            }

            function dataIsValid() {
                // basic validation just checking we have 4 items in the object and all the properties exist
                if (
                    (result.length === 4 && s1,
                    s2,
                    result.player_1 && result.player_2)
                ) {
                    return true;
                }

                return false;
            }

            function resultIsLessThan11() {
                return s1 + s2 < 11;
            }

            function differenceIsLow() {
                return diff(s1, s2) < 2;
            }

            function differenceIsHigh() {
                return diff(s1, s2) > 11;
            }

            function thePlayerPlayedThemeselves() {
                return result.player_1 === result.player_2;
            }

            function winningResultIsLessThan11() {
                let winningScore = [s1, s2].sort(function(a, b){return b-a})[0];

                if(winningScore < 11) {
                    return true;
                }
                
                return false;

            }

            winningResultIsLessThan11();

            if (
                dataIsValid() &&
                !resultIsLessThan11() &&
                !differenceIsHigh() &&
                !differenceIsLow() &&
                !thePlayerPlayedThemeselves() &&
                !winningResultIsLessThan11() 
            ) {
                result.id = mainService.results.length + 1;
                mainService.results.push(result);
                $scope.result = {};

                // recalculate the league table
                mainService.initLeague();

                // send the eevent to the league controller
                window.dispatchEvent(new Event("league-updated"));
            } else {
                // handle errors, just alert for now
                alert(
                    "Please check your scores, Table tennis rules state that a player wins if they reach 11 points however the player needs to win by at least 2 points."
                );
                return;
            }
        };
    },
]);
