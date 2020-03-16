import { reflector as conf } from 'config';
import { alphabet } from 'helpers';
import Reflector from 'Reflector';

describe('Reflector', () => {
	const reflector = new Reflector(conf);

	it('process', () => {
		expect(reflector.process(alphabet[0])).toBe(conf[0]);
		expect(reflector.process(alphabet.slice(-1))).toBe(conf.slice(-1));
	});

});
