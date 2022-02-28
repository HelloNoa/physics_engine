import {Enguine} from './Engine.js';
import {Dev} from './dev/Dev.js';
window.onload = ()=>{
    new Enguine('enguine');
    new Dev(new Enguine('enguine'));

    (async ()=>{
        const option: any = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            data: {
                name: 'test',
            }
        };
        await fetch("https://0100.ga:5051/getPosition", option).then((response) => console.log(response));
    })();
    
}
  