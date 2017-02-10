import { verbose } from './config.js';

const { normalizeCode, getCode, getLetter, log, Validate} = {

	normalizeCode: (code: number = 0): number =>
		(code < 0 || code > 25) ? Math.abs(Math.abs(code) - 26) : code,

	getCode(letter: string): number {
		Validate.letter(letter);
		return letter.charCodeAt(0) - 65;
	},

	getLetter(code: number = 0): string {
		Validate.letterCode(code);
		return String.fromCharCode(code + 65);
	},

	Validate: {
		letter(letter: string) {
			if(!/^[A-Z]$/.test(letter)) throw new Error('Validate.letter: ' + letter);
		},
		letterCode(code: number) {
			if(code < 0 || code > 25) throw new Error('Validate.letterCode: ' + code);
		},
		alphabet(cypher: string) {
			if(!/^[A-Z]{26}$/.test(cypher)) throw new Error('Validate.alphabet: ' + cypher);
		},
		plugboard(array: string[]) {
			if(array.length !== 13 || !array.every((item) => /^[A-Z]{2}$/.test(item)))
				throw new Error('Validate.plugboard: ' + array);
		},
		positions(positions: string) {
			if(!/^[A-Z]{3}$/.test(positions)) throw new Error('Validate.positions: ' + positions);
		},

		sentence(sentence: string) {
			if(!/^[A-Z ]*$/.test(sentence)) throw new Error('Validate.sentence: ' + sentence);
		},
	},

	log: (...args: Array<string | number | boolean>): void =>
		verbose && console.log.apply(console, args),

};

let alphabet = '';
for(let i = 0; i < 26; i++)
	alphabet += getLetter(i);

export { normalizeCode, getCode, getLetter, log, Validate, alphabet };
