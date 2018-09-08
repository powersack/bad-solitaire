(function (bs, $) {
    if(!bs.gfx) bs.gfx = {};
    var Text = function (text, pos, color, duration) {
        var self = this;
        var $el = $('<div>', {'class': 'gfx-entity gfx-text bounceIn', html: text || ''})
        bs.gfx.Entity.call(self, $el, pos, color, duration);

        self.text = text || "";
    };

    Text.prototype = Object.create(bs.gfx.Entity.prototype);
    Text.prototype.constructor = Text;

    Text.prototype.setText = function (text) {
        var self = this;
        self.text = text;
        return self;
    };


    bs.gfx.Text = Text;
}(bs, jQuery));