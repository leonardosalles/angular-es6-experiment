class AeApp {
    /*@ngInject*/
    constructor () {
        this.DEBUG = false;
        this.config = null;
        
        this.$get = ($log) => {
            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };

            return {
                log: log,
                error: error,
                DEBUG: this.debug,
                config: this.config,
                util: {
                    isEmpty: isEmpty,
                    getMasked: getMasked,
                    lpad: lpad
                }
            };

            let isEmpty = (value) => {
                return angular.isUndefined(value) || value === '' || value === null || value !== value;
            };

            let log = (message) => {
                if (this.DEBUG) {
                    $log.log(message);
                }
            };

            let error = (error) => {
                console.error(error);
            };

            let getMasked = (value, m) => {
                if (!value || !m) {
                    return;
                } 

                var m, l = (m = m.split('')).length, s = value.split(''), j = 0, h = '';
                for(var i = -1; ++i < l;)
                    if(m[i] != "#"){
                        if(m[i] == '\\' && (h += m[++i])) continue;
                        h += m[i];
                        i + 1 == l && (s[j - 1] += h, h = '');
                    } else{
                        if(!s[j] && !(h = '')) break;
                        (s[j] = h + s[j++]) && (h = '');
                    }
                return s.join('') + h;
            };

            let lpad = (value, padding) => {
				var zeroes = '0';
				for (var i = 0; i < padding; i++) {
					zeroes += '0';
				}
				return (zeroes + value).slice(padding * -1);
			};
        };
    }
}

angular.module('ae.common').provider('$ae',  () => new AeApp);