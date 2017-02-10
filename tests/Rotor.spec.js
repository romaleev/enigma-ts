import { alphabet } from 'helpers';
import Rotor from 'Rotor';

describe('Rotor', ()=> {

    const cypher = alphabet.split('').reverse().join('');
    const rotor = new Rotor({[alphabet]: 'A'}, 'A');
    const onTurn = ()=>{};

    it('init/getters', () => {
        expect(rotor.cypher).toBe(alphabet);
        expect(rotor.position).toBe('A');
        expect(rotor.autoTurn).toBe(false);
        expect(rotor.onTurn).toBeUndefined();
    });

    it('setters/getters', () => {
        rotor.cypher = cypher;
        rotor.position = 'B';
        rotor.autoTurn = true;
        rotor.onTurn = onTurn;

        expect(rotor.cypher).toBe(cypher);
        expect(rotor.position).toBe('B');
        expect(rotor.autoTurn).toBe(true);
        expect(rotor.onTurn).toBe(onTurn);

        rotor.autoTurn = false;
    });

    it('passForward/passBackward - default position', () => {
        rotor.position = 'A';

        expect(rotor.passForward('A')).toBe('Z');
        expect(rotor.passForward('Y')).toBe('B');

        expect(rotor.passBackward('Z')).toBe('A');
        expect(rotor.passBackward('B')).toBe('Y');
    });

    it('passForward/passBackward - shifted position', () => {
        rotor.position = 'C';

        expect(rotor.passForward('A')).toBe('X');
        expect(rotor.passForward('Y')).toBe('Z');

        expect(rotor.passBackward('X')).toBe('A');
        expect(rotor.passBackward('Z')).toBe('Y');
    });

    it('turn', () => {
        rotor.position = 'A';
        rotor.turn();
        expect(rotor.position).toBe('B');

        rotor.position = 'Z';
        rotor.turn();
        expect(rotor.position).toBe('A');
    });

    it('autoTurn', () => {
        rotor.autoTurn = true;

        rotor.position = 'A';
        expect(rotor.passForward('A')).toBe('Y');
        expect(rotor.position).toBe('B');

        rotor.position = 'Z';
        expect(rotor.passForward('A')).toBe('Z');
        expect(rotor.position).toBe('A');
    });

    it('turnLetter/onTurn', () => {
        rotor.autoTurn = false;
        rotor.position = 'Z';
        rotor.turnLetter = 'B';
        let turned = false;
        rotor.onTurn = ()=> turned = true;

        rotor.turn();
        expect(rotor.passForward('Z')).toBe('A');
        expect(rotor.passBackward('A')).toBe('Z');
        expect(rotor.position).toBe('A');
        expect(turned).toBe(false);

        rotor.turnLetter = 'A';
        rotor.turn();
        expect(rotor.passForward('A')).toBe('Y');
        expect(rotor.passBackward('X')).toBe('B');
        expect(rotor.position).toBe('B');
        expect(turned).toBe(true);
    });

    it('turnLetter/onTurn/autoTurn', () => {
        rotor.autoTurn = true;
        rotor.position = 'A';
        rotor.turnLetter = 'B';
        let turned = false;
        rotor.onTurn = ()=> turned = true;

        expect(rotor.passBackward('A')).toBe('Z');
        expect(rotor.position).toBe('A');
        expect(rotor.passForward('A')).toBe('Y');
        expect(rotor.position).toBe('B');
        expect(turned).toBe(false);

        expect(rotor.passForward('A')).toBe('X');
        expect(rotor.position).toBe('C');
        expect(turned).toBe(true);
    });

    it('chainRotors', () => {
        let rotors = [new Rotor({[cypher]: 'B'}, 'A'), new Rotor({[cypher]: 'B'}, 'A'), new Rotor({[cypher]: 'A'}, 'A')];
        Rotor.chainRotors(rotors);

        expect(rotors[0].autoTurn).toBe(true);
        expect(rotors[0].position).toBe('A');
        expect(rotors[1].position).toBe('A');
        expect(rotors[2].position).toBe('A');

        expect(rotors[0].passForward('A')).toBe('Y');
        expect(rotors[0].position).toBe('B');
        expect(rotors[1].position).toBe('A');
        expect(rotors[2].position).toBe('A');

        expect(rotors[0].passForward('A')).toBe('X');
        expect(rotors[0].position).toBe('C');
        expect(rotors[1].position).toBe('B');
        expect(rotors[2].position).toBe('A');

        rotors[0].position = 'B';

        expect(rotors[0].passForward('A')).toBe('X');
        expect(rotors[0].position).toBe('C');
        expect(rotors[1].position).toBe('C');
        expect(rotors[2].position).toBe('B');
    });

});
