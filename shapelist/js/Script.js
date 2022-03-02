import { Enguine } from './../../js/Engine.js';
window.onload = () => {
    const logic = new Enguine('enguine');
    // setPolygon();
    (async () => {
        let DATA = await api_allPolygon();
        const left_side = document.querySelector('.left_side');
        const ul = document.createElement('ul');
        left_side.appendChild(ul);
        console.log(DATA);
        DATA.forEach((e) => {
            addShapeInList(e.id, e.name, e.position);
        });
    })();
    const input = document.querySelector('.shapeName');
    const addShape = document.querySelector('.addShape');
    const saveShape = document.querySelector('.saveShape');
    addShape.addEventListener('click', async () => {
        const ID = (await api_lastID())[0].max + 1;
        console.log(ID);
        addShapeInList(ID, input.value);
        api_newPolygon(ID, input.value, '');
        input.value = '';
    });
    saveShape.addEventListener('click', () => {
    });
};
function addShapeInList(id, name, position = '') {
    const ul = document.querySelector('.left_side ul');
    const li = document.createElement('li');
    const span = document.createElement('span');
    const btn_remove = document.createElement('a');
    span.innerText = `${id} : ${name}`;
    li.addEventListener('click', el => {
        console.log(JSON.parse(position));
    });
    btn_remove.innerText = `(X)`;
    btn_remove.style.marginLeft = '10px';
    btn_remove.addEventListener('click', async (el) => {
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
async function api_remove(id) {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    };
    return await fetch("https://0100.ga:5051/removePolygon", option)
        .then((response) => response.json());
}
async function api_newPolygon(id, name, position) {
    const option = {
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
        .then((response) => response.json());
}
async function api_lastID() {
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await fetch("https://0100.ga:5051/lastID", option)
        .then((response) => response.json());
}
async function api_allPolygon() {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'test',
        }),
    };
    return await fetch("https://0100.ga:5051/allPolygon", option)
        .then((response) => response.json());
}
async function api_getPolygon() {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'test',
        }),
    };
    return await fetch("https://0100.ga:5051/getPosition", option)
        .then((response) => response.json());
}
async function api_setPolygon() {
    const arr = [{ x: 100, y: 100 }, { x: 200, y: 50 }, { x: 300, y: 100 }, { x: 250, y: 200 }, { x: 150, y: 200 }];
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            position: arr,
        }),
    };
    let res = await fetch("https://0100.ga:5051/setPolygon", option)
        .then((response) => response.json());
}
