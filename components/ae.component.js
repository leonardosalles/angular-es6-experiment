const DIRECTIVE_DEFAULT_METHODS = [
    'constructor',
    'controller',
    'compile',
    'linkComponent',
    'linkPre',
    'linkPost',
    'compile'
];

class AeComponent {
    constructor(){
        this.link = {};

        if (this.linkComponent) {
            this.setLinkDefault();
        }

        if (this.linkPre) {
            this.link.pre = (...args) => {
                this.linkPre(...args);

                this.setScopeMethods(...args);
            };
        }

        if (this.linkPost) {
            this.link.post = (...args) => {
                this.linkPost(...args);

                this.setScopeMethods(...args);
            };
        }

        if (!this.linkComponent && !this.linkPre && !this.linkPost) {
            this.setLinkDefault();
        }
    }
    
    setLinkDefault () {
        this.link = (...args) => {
            this.setScopeMethods(...args);
        };
    }

    setScopeMethods (scope) {
        let componentFunctions = Object.getOwnPropertyNames(Object.getPrototypeOf(this)),
            self = this;

        if (componentFunctions.length) {
            componentFunctions.forEach((key) => {
                if (DIRECTIVE_DEFAULT_METHODS.indexOf(key) === -1) {
                    scope[key] = (...args) => {
                        return this[key].call(self, ...args);
                    };
                }
            });
        }
    }
}