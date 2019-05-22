let xml2js = require('xml2js');
let Promise = require('bluebird');
let xmlparse = new xml2js.Parser({
    explicitArray: false,
    ignoreAttrs: true
})
exports.parsexml = (xml) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, {
            trim: true
        }, (err, content) => {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        })
    });
}

formatMessage = (result) => {
    var message = {};
    if (typeof result === 'object') {
        var keys = Object.keys(result);
        for (var i = 0; i < keys.length; i++) {
            var item = result[keys[i]]
            var key = keys[i]
            if (!(item instanceof Array) || item.length == 0) {
                continue;
            }
            if (item.length == 1) {
                var val = item[0]
                if (typeof val == 'object') {
                    message[key] = formatMessage(val)
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                mesage[key] = [];
                for (var j = 0, k = item.length; j < k; j++) {
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    }
    return message;
}
exports.formatMessage = formatMessage;