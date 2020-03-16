import Enigma from 'Enigma';

const decrypted = 'HELLO WORLD';
const encripted = 'KQKBV GWPUB';
const positions = 'OBY';

describe('Enigma', () => {

	const enigma = new Enigma('ABC');

	it('init/getters', () => {
		expect(() => new Enigma('ABa')).toThrowError('Validate.positions: ABa');

		expect(enigma.positions).toBe('ABC');
	});

	it('setters/getters', () => {
		enigma.positions = 'OBY';

		expect(enigma.positions).toBe('OBY');
	});

	it('process', () => {
		expect(() => enigma.process(decrypted + 'a')).toThrowError('Validate.sentence: ' + decrypted + 'a');

		expect(enigma.process(decrypted)).toBe(encripted);
		expect(enigma.process(encripted)).not.toBe(decrypted);
		expect(enigma.process(encripted, positions)).toBe(decrypted);
		expect(enigma.positions).toBe('YCY');

		const _sentence = 'KEINE BESONDEREN EREIGNISSE';
		const _positions = 'BVA';
		expect(enigma.process(enigma.process(_sentence, _positions), _positions)).toBe(_sentence);
	});

});
