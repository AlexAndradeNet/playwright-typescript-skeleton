/* eslint-disable */
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
            console.error(error);
        }
        process.exit();
    }
).then(() => {
    console.log('Sonarqube analysis finished');
});
