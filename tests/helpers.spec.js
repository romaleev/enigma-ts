import { normalizeCode, getCode, getLetter, Validate, alphabet as _alphabet } from 'helpers';

let { letter, letterCode, alphabet, plugboard} = Validate;

describe('helpers', ()=> {

    it('normalizeCode', () => {
        expect(normalizeCode(0)).toBe(0);
        expect(normalizeCode(25)).toBe(25);
        expect(normalizeCode(-1)).toBe(25);
        expect(normalizeCode(-10)).toBe(16);
        expect(normalizeCode(26)).toBe(0);
        expect(normalizeCode(30)).toBe(4);
    });

    it('getCode', () => {
        expect(getCode('A')).toBe(0);
        expect(getCode('Z')).toBe(25);
    });

    it('getLetter', () => {
        expect(getLetter(0)).toBe('A');
        expect(getCode('Z')).toBe(25);
    });

    it('Validate', () => {

        letter('A');
        expect(()=> letter('')).toThrowError('Validate.letter: ');
        expect(()=> letter('b')).toThrowError('Validate.letter: b');
        expect(()=> letter('AA')).toThrowError('Validate.letter: AA');

        letterCode(0);
        expect(()=> letterCode(-1)).toThrowError('Validate.letterCode: -1');
        expect(()=> letterCode(26)).toThrowError('Validate.letterCode: 26');

        alphabet(_alphabet);
        const _alphabet2 = _alphabet + 'a';
        expect(()=> alphabet(_alphabet2)).toThrowError('Validate.alphabet: ' + _alphabet2);

        let _plugboard = ['AY', 'BR', 'CU', 'DH', 'EQ', 'FS', 'GL', 'IP', 'JX', 'KN', 'MO', 'TZ', 'VW'];
        plugboard(_plugboard);
        _plugboard[0] = 'aY';
        expect(()=> plugboard(_plugboard)).toThrowError('Validate.plugboard: ' + _plugboard);

    });

});