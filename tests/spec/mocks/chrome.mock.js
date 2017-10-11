var chrome = {
    storage: {
        local: {
            get: function(storageKey, callback) {
                callback({ settings: { option: 0 } });
            },
            set: function(storage) {}
        }
    },
    tabs: {
        create: function (obj) {}
    }
};