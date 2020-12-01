export class Logger {
    constructor(name) {
        this.name = name;
    }
    info(str) {
        console.log(this.name + " " + ": "+ str);
    }
}