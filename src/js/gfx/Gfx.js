(function (bs, $) {
    if(!bs.gfx) bs.gfx = {};
    var Gfx = function () {
        var self = this;
        self.$el = $('<div>', {'class': 'gfx'});

    };

    Gfx.prototype.text = function (t, pos, color) {
        var self = this;
        console.log(arguments);
        var text = new bs.gfx.Text(t, pos, color, 500);
        self.$el.append(text.$el);
        text.show();
    };


    bs.gfx.Gfx = Gfx;
}(bs, jQuery));