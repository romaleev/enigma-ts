import * as _config from './config';
import { Validate } from './helpers';
import Rotor from './Rotor';
import Reflector from './Reflector';
import Plugboard from './Plugboard';

interface IConfig {
	rotors: Array<{[key: string]: string}>;
	reflector: string;
	plugboard?: string[];
}

export default class Enigma {

	private readonly plugboard?: Plugboard;
	private readonly rotors: Rotor[];
	private reflector: Reflector;

	constructor(positions: string = 'AAA', config: IConfig = _config) {
		Validate.positions(positions);

		const {rotors = _config.rotors, reflector = _config.reflector, plugboard = _config.plugboard} = config;

		this.reflector = new Reflector(reflector);

		if(plugboard) {
			this.plugboard = new Plugboard(plugboard);
		}

		this.rotors = (rotors as Array<{[key: string]: string}>).map((cypher: {[key: string]: string}, i: number): Rotor =>
			new Rotor(cypher, positions[i]));

		Rotor.chainRotors(this.rotors);
	}

	/**
	 * Encode/decode sentence.
	 */
	public process(sentence: string = '', positions?: string): string {
		if(positions) {
			Validate.positions(positions);
			this.positions = positions;
		}

		Validate.sentence(sentence);

		return sentence.split('').reduce((prev, letter) =>
			prev + this.processLetter(letter), '');
	}

	/**
	 * Get rotors positions.
	 * @example enigma.positions === 'ABC'
	 */
	get positions() {
		return this.rotors.reduce((prev, rotor) =>
			prev + rotor.position, '');
	}

	/**
	 * Set rotors positions.
	 * @example enigma.positions = 'ABC'
	 */
	set positions(positions: string) {
		positions.split('').forEach((position, i) =>
			this.rotors[i].position = position);
	}

	private processLetter(letter: string): string {

		if(letter === ' ') return ' ';

		Validate.letter(letter);

		const forwardLetter: string = this.rotors.reduce((prev, rotor) =>
			rotor.passForward(prev), this.plugboard ? this.plugboard.process(letter, 'start') : letter);

		const reflectedLetter = this.reflector.process(forwardLetter);

		const backwardLetter = this.rotors.reduceRight((prev, rotor) =>
			rotor.passBackward(prev), reflectedLetter);

		return this.plugboard ? this.plugboard.process(backwardLetter, 'end') : backwardLetter;
	}

}
