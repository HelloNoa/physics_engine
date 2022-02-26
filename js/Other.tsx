interface I_Layer{
    layer: any;
    type: string[];
}

export const Layer = new class Layer implements I_Layer {
    layer: any;
    type: string[];
    constructor() {
        this.layer=[];
        this.type=[];
    }
    GetLayer(): any {
        return this.layer;
    }
    SetDefault(): void {
        this.layer=[];
        this.type=[];
        this.type.push('background');
        this.type.push('ground');
        this.type.push('sprite');
        this.type.push('ui');

        const length = this.type.length;

        this.type.forEach(e=>{
            this.layer[e] = [];
            this.type.forEach(e2=>{
                this.layer[e][e2] = false;
            });
            this.layer[e].length = length;
        });
        this.layer.length = length;
    }
    AddLayer(layerName: string): boolean|void {
        if(!layerName) return false;
        if(this.type.includes(layerName)) return false;
        const lastType = [...this.type];
        this.type.push(layerName);
        const length = this.type.length;
        this.layer[layerName] = [];
        lastType.forEach(e=>{
            this.layer[e][layerName] = false;
            this.layer[e].length = length;
        })
        this.type.forEach(e=>{
            this.layer[layerName][e] = false;
            this.layer[layerName].length = length;
        })
        this.layer.length = this.type.length;
    }
    
    EffectOneLayer(a: string, b: string): boolean|void {
        if(!this.type.includes(a)) return false;
        if(!this.type.includes(b)) return false;
        this.layer[a][b] = true;
    }
    EffectBothLayer(a: string, b: string): boolean|void {
        if(!this.type.includes(a)) return false;
        if(!this.type.includes(b)) return false;
        this.layer[a][b] = true;
        this.layer[b][a] = true;
    }
    RemoveEffectOneLayer(a: string, b: string): boolean|void {
        if(!this.type.includes(a)) return false;
        if(!this.type.includes(b)) return false;
        this.layer[a][b] = false;
    }
    RemoveEffectBothLayer(a: string, b: string): boolean|void {
        if(!this.type.includes(a)) return false;
        if(!this.type.includes(b)) return false;
        this.layer[a][b] = false;
        this.layer[b][a] = false;
    }
}

class Map {
    constructor() {

    }
}

class Global {
    constructor() {
        
    }
}

interface I_Level{
    level: number;
}
class Level implements I_Level {
    level: number;
    constructor(level=0) {
        this.level = level;
    }
}