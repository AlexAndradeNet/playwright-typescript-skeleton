// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires,@typescript-eslint/typedef
const scanner = require('sonarqube-scanner').default;

scanner(
    {
        serverUrl: 'http://localhost:9000',
        options: {
            'sonar.scm.provider': 'git',
        },
    },
    error => {
        if (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
        process.exit();
    }
).then(() => {
    // eslint-disable-next-line no-console
    console.log('Sonarqube analysis finished');
});
