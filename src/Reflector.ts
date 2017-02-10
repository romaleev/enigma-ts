import { log, Validate, alphabet } from './helpers';

export default class Reflector {

	private data: Map<string, string> = new Map();

	constructor(config: string = '') {
		Validate.alphabet(config);
		for(let i = 0; i < alphabet.length; i++)
			this.data.set(alphabet[i], config[i]);
	}

	public process(letter: string): string {
		const result = this.data.get(letter) || '';
		log('reflect', letter, '->', result);
		return result;
	}
}
