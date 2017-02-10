import Jasmine from 'jasmine';

let jasmine = new Jasmine();
jasmine.loadConfig({
    spec_dir: 'tests',
    spec_files: [
     '*.spec.js'
    ]
});

jasmine.execute();
