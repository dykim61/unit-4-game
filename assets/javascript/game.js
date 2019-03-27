$(document).ready(function () {
    var userMatchingNumber = 0;

    var randomNum = randomNumGen()

    var wins = 0;
    var losses = 0;
    var crystals;

    function randonNumCrystals() {
        return {
            red: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/red.png"
            },
            blue: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/blue.png"
            },
            red: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/yellow.png"
            },
            green: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/green.png"
            }
        };
    }

    function randonNumGen() {
        return Math.floor(Math.random() * 102) + 19;
    }

    function setGame() {
        yourMatchingNumber = 0;
        crystals = randomNumCrystals();
        randomNum = randomNumGen();
        $("#random-area").text(randomNum);
    }
    function updateDom(didUserWin) {
        $("#win-area").empty();
        if (didUserWin === true) {
            $("#win-area").appen($("<p>").text("You won!!"));
            setGame();
            renderMatchingNumer();
        }
        else if (didUserWin === false) {
            $("#win-area").append($("<p>").text("You lost!!"));
            setGame();
            renderingMatchingNumber();
        }

        var wSpan = $("<span>").text(wins);
        var lSpan = $("<span>").text(losses);

        var pWins = $("<p>").text("Wins: ");
        var pLosses = $("<p>").text("Losses: ");

        pWins.append(wSpan);
        pLosses.append(lSpan);

        $("#win-area").append(pWins);
        $("#win-area").append(pLosses);
    }
    function renderCrystals() {
        for (var key in crystals) {
            var crystalDiv = $("<div class = 'crystals-button' data-name='" + key + "'>");
            var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
            crystalDiv.append(crystalImg);
            $("#crystal-area").append(crystalDiv);
        }
    }
    function updateMatchingNumber(crystal) {
        yourMatchingNumber += crystals[crystal.attr("data-name")].points;
    }
    function renderMatchingNumber() {
        var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
        $("#score-area").html();
        $("#score-area").html(scoreNumDiv);
    }

    setGame();
    updateDom();
    renderCrystals();
    renderMatchingNumber();

    $(".crystals-button").on("click", function (event) {
        updateMatchingNumber($(this));
        renderMatchingNumber();
        if (yourMatchingNumber === randomNum) {
            wins++;
            setGame();
            updateDom(true);
        }
        else if (yourMatchingNumber > randomNum) {
            losses++;
            setGame();
            updateDom(false);
        }
    });

});