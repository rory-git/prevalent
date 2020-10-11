app.service("mainService", function () {
    this.players = [
        { id: 1, name: "Justin" },
        { id: 2, name: "Liam" },
        { id: 3, name: "Steve (CEO)" },
        { id: 4, name: "Dan" },
        { id: 5, name: "Lee" },
        { id: 6, name: "Gavin" },
        { id: 7, name: "Tracey" },
        { id: 8, name: "David" },
        { id: 9, name: "Sam" },
        { id: 10, name: "Chris" },
        { id: 11, name: "Joe" },
        { id: 12, name: "Emma" },
    ];

    this.results = [
        {
            id: 1,
            player_1: "Justin",
            score_1: 11,
            player_2: "Steve (CEO)",
            score_2: 6,
        },
        {
            id: 2,
            player_1: "Steve (CEO)",
            score_1: 13,
            player_2: "Dan",
            score_2: 11,
        },
        {
            id: 3,
            player_1: "Liam",
            score_1: 6,
            player_2: "Lee",
            score_2: 11,
        },
        {
            id: 4,
            player_1: "Liam",
            score_1: 11,
            player_2: "Steve (CEO)",
            score_2: 9,
        },
        {
            id: 5,
            player_1: "Justin",
            score_1: 14,
            player_2: "Lee",
            score_2: 12,
        },
        {
            id: 6,
            player_1: "Justin",
            score_1: 10,
            player_2: "Dan",
            score_2: 12,
        },
        {
            id: 7,
            player_1: "Dan",
            score_1: 11,
            player_2: "Lee",
            score_2: 9,
        },
        {
            id: 8,
            player_1: "Justin",
            score_1: 11,
            player_2: "Liam",
            score_2: 3,
        },
        {
            id: 9,
            player_1: "Tracey",
            score_1: 11,
            player_2: "Emma",
            score_2: 8,
        },
        {
            id: 10,
            player_1: "Emma",
            score_1: 11,
            player_2: "Dan",
            score_2: 9,
        },
    ];

    this.league = [];

    /**
     * 
     * @param {string} name 
     */
    this.findPlayer = (name) => {
        /**
         * Look to see if we have a player
         * with the given name
         */
        index = this.players.findIndex((x) => x.name === name);

        if(index === -1) {
            return false
        }

        return true;
    };

    /**
     * 
     * @param {string} property 
     */
    this.dynamicSort = function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result =
                a[property] < b[property]
                    ? -1
                    : a[property] > b[property]
                    ? 1
                    : 0;
            return result * sortOrder;
        };
    };
    
    /**
     * 
     * @param {string} player 
     */
    this.addWin = (player) => {
        // get index of player in league
        index = this.league.findIndex((x) => x.name === player);
        if (index >= 0) {
            // if we have a player in the league add points
            this.league[index].points += 2;
        } else {
            // if there is no existing player create the entry
            this.league.push({ name: player, points: 2 });
        }
    };

    /**
     * Demote Ceo
     */
    this.demoteCeo = () => {
        // get index of player in league
        index = this.league.findIndex((x) => x.name === "Steve (CEO)");
        // fix points to 0
        this.league[index].points = 0;
    };

    /**
     * Create the league data
     */
    this.initLeague = () => {
        // Reset league
        this.league = [];

        // Get the winner and process a win
        this.results.map((r) => {
            if (r.score_1 > r.score_2) {
                this.addWin(r.player_1);
            } else if (r.score_1 < r.score_2) {
                this.addWin(r.player_2);
            }
        });

        // CEO has no points ever
        this.demoteCeo();

        // Sort the results
        this.league.sort(this.dynamicSort("-points"));
    };
    // call on page load
    this.initLeague();
});