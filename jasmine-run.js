import glob from 'glob';
import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile('./spec/support/jasmine.json');

// Load your mjs specs
glob('spec/**/*.spec.mjs', function (er, files) {
    Promise.all(
        files
            // Use relative paths
            .map(f => f.replace('spec/', './spec/'))
            .map(f => import(f)
                .catch(e => {
                    console.error('** Error loading ' + f + ': ');
                    console.error(e);
                    process.exit(1);
                }))
    )
        .then(() => jasmine.execute());
});
