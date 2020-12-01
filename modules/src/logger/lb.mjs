export class Logger {
    constructor(name) {
        this.name = name;
    }
    info(...args) {
        let sum = "";

        for (let arg of args) sum += arg +" ";
        console.log(this.name + " " + Date(Date.now()).toString() + ": "+ sum);
    }
}