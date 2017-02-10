import { log, Validate } from './helpers';

export default class Plugboard {

	private data: Map<string, string> = new Map();

	constructor(config: string[] = []) {
		Validate.plugboard(config);
		config.forEach((pair) => {
			this.data.set(pair[0], pair[1]);
			this.data.set(pair[1], pair[0]);
		});
	}

	public process(letter: string, comment?: string): string {
		const result: string = this.data.get(letter) || '';
		log('plugboard ' + comment, letter, '->', result);
		return result;
	}
}
