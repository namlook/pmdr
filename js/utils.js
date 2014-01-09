
var Pmdr = Pmdr || {};
Pmdr.utils = {};

Pmdr.utils.notify = function(title, options) {
    var _notify = function() {
        new Notification(title, options);
    };
    var Notification = window.Notification || window.mozNotification || window.webkitNotification;
    if (Notification) {
        var permission = Notification.permission;
        if (permission === "granted") {
            _notify();
        }
        else if (permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if(!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                if (permission === "granted") {
                    _notify();
                }
            });
        }
    }
};

Pmdr.utils.prettifySeconds = function(seconds) {
    var minutes = parseInt(seconds/60, 10);
    minutes = _.str.pad(minutes, 2, '0');
    seconds = _.str.pad(seconds % 60, 2, '0');
    return minutes+":"+seconds;
};
