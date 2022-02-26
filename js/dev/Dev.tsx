import {Layer} from '../Other.js';

interface I_Dev {
    Enguine: any;
}
export class Dev implements I_Dev{
    Enguine: any;
    constructor(Enguine: any){
        this.Enguine = Enguine;
        console.log(Layer);
        const layer = document.createElement('div');
        document.body.appendChild(layer);
    }
}