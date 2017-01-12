export default class infoController {
    getInfo(name) {
        this.name = name;
        return console.log(`Hello ${this.name}`);
    }
}