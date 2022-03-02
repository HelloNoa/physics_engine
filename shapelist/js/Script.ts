import {Enguine} from './../../js/Engine.js';
import {Dev} from './../../js/dev/Dev.js';

window.onload = ()=>{
    const logic = new Enguine('enguine');
    // setPolygon();
    (async()=>{
        let DATA: any = await api_allPolygon();
        const left_side: HTMLElement = document.querySelector('.left_side') as HTMLDivElement;
        const ul: HTMLUListElement = document.createElement('ul');
        left_side.appendChild(ul);
        console.log(DATA);
        DATA.forEach((e: any)=>{
            addShapeInList(e.id, e.name, e.position);
        });
    })();
    const input: HTMLInputElement = document.querySelector('.shapeName') as HTMLInputElement;
    const addShape: HTMLElement = document.querySelector('.addShape') as HTMLDivElement;
    const saveShape: HTMLElement = document.querySelector('.saveShape') as HTMLDivElement;
    addShape.addEventListener('click', async ()=>{
        const ID: number = (await api_lastID())[0].max+1;
        console.log(ID);
        addShapeInList(ID, input.value);
        api_newPolygon(ID, input.value, '');
        input.value = '';
    });
    saveShape.addEventListener('click',()=>{

    });
}


function addShapeInList(id: number, name: string, position: string=''){
    const ul: HTMLUListElement = document.querySelector('.left_side ul') as HTMLUListElement;
    const li: HTMLLIElement = document.createElement('li');
    const span: HTMLSpanElement = document.createElement('span');
    const btn_remove: HTMLAnchorElement = document.createElement('a');
    span.innerText = `${id} : ${name}`;

    li.addEventListener('click',el=>{
        console.log(JSON.parse(position));
    });

    btn_remove.innerText = `(X)`;
    btn_remove.style.marginLeft = '10px';
    btn_remove.addEventListener('click', async (el)=>{
        el.stopPropagation();
        console.log('xx');
        api_remove(id);
        ul.removeChild(li);
        return false;
    });

    li.appendChild(span);
    li.appendChild(btn_remove);
    ul.appendChild(li);
}

async function api_remove(id: number) {
    const option: any = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
                id: id,
        }),
    };
    return await fetch("https://0100.ga:5051/removePolygon", option)
        .then((response: any): string => response.json());
}

async function api_newPolygon(id: number, name: string, position: string) {
    const option: any = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
                id: id,
                name: name,
                position: position,
        }),
    };
    return await fetch("https://0100.ga:5051/newPolygon", option)
        .then((response: any): string => response.json());
}
async function api_lastID(): Promise<any>{
    const option: any = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await fetch("https://0100.ga:5051/lastID", option)
        .then((response: any): string => response.json());
    
}

async function api_allPolygon(){
    const option: any = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
                name: 'test',
        }),
    };
    return await fetch("https://0100.ga:5051/allPolygon", option)
        .then((response: any): string => response.json());
}

async function api_getPolygon(){
    const option: any = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
                name: 'test',
        }),
    };
    return await fetch("https://0100.ga:5051/getPosition", option)
        .then((response: any): string => response.json());
}

async function api_setPolygon(){
    const arr = [{x:100,y:100},{x:200,y:50},{x:300,y:100},{x:250,y:200},{x:150,y:200}];
    const option: any = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
                position: arr,
        }),
    };
    let res = await fetch("https://0100.ga:5051/setPolygon", option)
        .then((response: any): string => response.json())
}