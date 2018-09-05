;(function (bs, $) {
    var Helpers = function () {

    };

    Helpers.prototype.shuffleArray = function (array) {
        var i = 0
            , j = 0
            , temp = null

        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    bs.Helpers = new Helpers();
}(bs, jQuery))