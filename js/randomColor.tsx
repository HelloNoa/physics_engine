interface I_RandomColor{
    range: string[];
    length: number;
}
export default new class RandomColor implements I_RandomColor{
    range: string[];
    length: number;
    constructor(){
        this.range=[];
        this.range.push('0');
        this.range.push('1');
        this.range.push('2');
        this.range.push('3');
        this.range.push('4');
        this.range.push('5');
        this.range.push('6');
        this.range.push('7');
        this.range.push('8');
        this.range.push('9');
        this.range.push('a');
        this.range.push('b');
        this.range.push('c');
        this.range.push('d');
        this.range.push('e');
        this.range.push('f');

        this.length = this.range.length;
    }
    random(bool: boolean=false): string{
        let color: string = '';
        bool && (color='#')
        for(let i:number = 0; i<6; i++) {
            color += this.range[Math.floor(Math.random()*16)];
        }
        return color;
    }
}