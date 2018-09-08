;(function (bs, $) {
    var $game = $('<div class="game">');
    $('#games').append($game);
    game = new bs.Game($game);
    // $('#createGame').click(function () {
    //     var $game = $('<div class="game">');
    //     $('#games').append($game);
    //     game = new bs.Game($game);
    // });
}(bs, jQuery));
