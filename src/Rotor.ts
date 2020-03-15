import { log, getLetter, getCode, normalizeCode, Validate, alphabet } from './helpers';

export default class Rotor {

	public static chainRotors(rotors: Rotor[]) {
		rotors[0].autoTurn = true;
		for (let i = 0; i < rotors.length - 1; i++)
			rotors[i].onTurn = () => rotors[i + 1].turn();
	}

	private _cypher: string = alphabet;
	private _turnLetter: string = 'Z';
	private _offset: number = 0;
	private _onTurn: () => void;
	private _autoTurn: boolean = false;

	constructor(config: {[key: string]: string}, position: string = 'A') {
		this._cypher = Object.keys(config)[0];
		this._turnLetter = config[this._cypher];
		Validate.alphabet(this._cypher);
		Validate.letter(this._turnLetter);
		Validate.letter(position);
		this.position = position;
		log('new Rotor', this.cypher, 'step:', this._turnLetter, 'position:', position);
	}

	get cypher() {
		return this._cypher;
	}
	set cypher(cypher: string) {
		this._cypher = cypher;
	}

	get turnLetter() {
		return this._turnLetter;
	}
	set turnLetter(letter: string) {
		this._turnLetter = letter;
	}

	get position() {
		return getLetter(this._offset);
	}
	set position(position: string) {
		this._offset = getCode(position);
	}

	get autoTurn() {
		return this._autoTurn;
	}
	set autoTurn(turn: boolean) {
		this._autoTurn = turn;
	}

	get onTurn() {
		return this._onTurn;
	}
	set onTurn(callback: () => void) {
		this._onTurn = callback;
	}

	public turn() {
		if(this.position === this._turnLetter) {
			log('step turned', this.position, '->', getLetter(normalizeCode(this._offset + 1)), this.cypher);
			this._onTurn && this._onTurn();
		}
		const oldPosition = this.position;
		this._offset = normalizeCode(this._offset + 1);
		log('position', oldPosition, '->', this.position, this.cypher, '(' + this._turnLetter + ')');
	}

	public passForward(letter: string): string {
		this._autoTurn && this.turn();
		log('fwd', letter, '->', this.cypher[normalizeCode(getCode(letter) + this._offset)], this.cypher);
		return this.cypher[normalizeCode(getCode(letter) + this._offset)];
	}

	public passBackward(letter: string): string {
		const result = getLetter(normalizeCode(this.cypher.indexOf(letter) - this._offset));
		log('bkw', letter, '->', result, this.cypher);
		return result;
	}
}
