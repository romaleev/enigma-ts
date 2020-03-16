import { plugboard as conf } from 'config';
import Plugboard from 'Plugboard';

describe('Plugboard', () => {
	const plugboard = new Plugboard(conf);

	it('process', () => {
		expect(plugboard.process(conf[0][0])).toBe(conf[0][1]);
		expect(plugboard.process(conf[conf.length - 1][1])).toBe(conf[conf.length - 1][0]);
	});
});
