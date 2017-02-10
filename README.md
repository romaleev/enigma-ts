# Enigma [![Build Status](https://travis-ci.org/romaleev/enigma-ts.svg)](https://travis-ci.org/romaleev/enigma-ts)

TypeScript [Enigma Machine](https://en.wikipedia.org/wiki/Enigma_machine) Implementation.

Enigma M3 with three rotors, reflector and plugboard.

Work principle can be found [here](https://www.theguardian.com/technology/2014/nov/14/how-did-enigma-machine-work-imitation-game)

## Install

```bash
npm i enigma-ts
```

## Usage

```JavaScript
var Enigma = require('enigma-ts');

var enigma = new Enigma('AAA');

enigma.process('HELLO WORLD'); // LMHNH TMAUA

/**
* Or with configuration
* */

var default_config = {
   rotors: [
	   {'EKMFLGDQVZNTOWYHXUSPAIBRCJ': 'Q'},
	   {'AJDKSIRUXBLHWTMCQGZNPYFVOE': 'E'},
	   {'BDFHJLCPRTXVZNYEIWGAKMUSQO': 'V'},
   ],
   plugboard: ['AY', 'BR', 'CU', 'DH', 'EQ', 'FS', 'GL', 'IP', 'JX', 'KN', 'MO', 'TZ', 'VW'],
   reflector: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
};

enigma = new Enigma('OBY', default_config);

enigma.positions; // OBY

enigma.positions = 'AAA';

enigma.positions; // AAA
```

### Test

```bash
npm i
npm test
``` 
