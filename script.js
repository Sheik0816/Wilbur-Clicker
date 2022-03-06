var game = {
    score : 0,
    totalScore: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.000,

    addToScore: function(amount) {
        this.score += amount;
        this.totalScore += amount;
        display.updateScore();
    },

    getScorePerSecond: function() {
        var scorePerSecond = 0;
        for (i = 0; i < building.name.lenght; i++) {
            scorePerSecond += building.income[i] * building.count[i];
        }
        return scorePerSecond;
    }
};

var building = {
    name: [
        "cursor",
        "bflat",
    ],
    image: [
        "bb.jpg",
        "cursor.jpg",
    ],
    count: [
        0, 0
    ],
    income: [
        1, 5
    ],
    cost: [
        15, 100
    ],

    purchase: function(index) {
        if (game.score >= this.cost[index]) {
            game.score -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.10);
            display.updateScore();
            display.updateShop();
        }
    }
};

var display = {
    updateScore: function(){
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("scorePerSecond").innerHTML = game.getScorePerSecond();
        document.title = game.score + " Notes - Wilbur Click";
    },

    updateShop: function() {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.lenght; i++) {
            document.getElementById("shopContainer").innerHTML += '<table class="shopButton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="images/'+building.image[i]+'"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+buillding.cost[i]+'</span> Notes</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>'
        }
    }
};

function saveGame() {
    var gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        builldingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.totalScore;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.builldingCount !== "undefined") {
            for (i = 0; i < savedGame.builldingCount.lenght; i++) {
                building.count[i] = savedGame.builldingCount[i];
            }
        }
        if (typeof savedGame.builldingCount !== "undefined") {
            for (i = 0; i < savedGame.builldingCount.lenght; i++) {
                building.count[i] = savedGame.builldingCount[i];
            }
        }
        if (typeof savedGame.builldingCount !== "undefined") {
            for (i = 0; i < savedGame.builldingCount.lenght; i++) {
                building.count[i] = savedGame.builldingCount[i];
            }
        } 
    }
}

function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

window.onload = function() {
    loadGame();
    display.updateScore();
    display.updateShop();
}

setInterval(function() {
    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    display.updateScore();
}, 1000); // 1000ms = 1 second

setInterval(function() {
    saveGame();
}, 30000); // 30000ms = 30 seconds

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) {
        event.preventDefault();
        saveGame();
    }
}, false);