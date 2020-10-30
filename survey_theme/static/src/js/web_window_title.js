odoo.define('web_window_title', function (require) {
    "use strict";

    var WebClient = require('web.WebClient');
    WebClient.include({
        init: function () {
            this._super.apply(this, arguments);
            console.log(this);
            this.set('title_part', {"zopenerp": document.title || "VMS"});
        }
    });

});