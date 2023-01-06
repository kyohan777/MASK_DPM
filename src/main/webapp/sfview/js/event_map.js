function EventMap() {
    const root = this;
    const Module = (typeof exports !== 'undefined') ? exports : (root.Module = {});
    const eventMap = new Map();

    Module.add = function(name, handler) {
        let handlers = eventMap.get(name);
        if (!handlers) {
            handlers = new Array();	
            eventMap.set(name, handlers);
        }
        handlers.push(handler);
    }

    Module.run = function(name, ...args) {
        const handlers = eventMap.get(name);
        if (handlers) {
            handlers.forEach( handler => {
                handler(...args);
            });

            return true;
        }

        return false;
    }

    return Module;    
};