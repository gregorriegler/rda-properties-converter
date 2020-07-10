const expect = require('chai').expect;
const rdaProperties = require('../src/rda-properties');

describe('RDA Properties converter', function () {
    it('converts a string property from yaml', function () {
        expect(rdaProperties.fromYaml('foo: bar')).to.equal(
            'application.params.[foo].name=foo\n' +
            'application.params.[foo].value=bar\n'
        );
    })

    it('converts a numeric property from yaml', function () {
        expect(rdaProperties.fromYaml('foo: 3')).to.equal(
            'application.params.[foo].name=foo\n' +
            'application.params.[foo].value=3\n'
        );
    })

    it('converts a boolean property from yaml', function () {
        expect(rdaProperties.fromYaml('foo: true')).to.equal(
            'application.params.[foo].name=foo\n' +
            'application.params.[foo].value=true\n'
        );
    })

    it('converts a multiple properties from yaml', function () {
        expect(rdaProperties.fromYaml(
            'foo: bar\n' +
            'foo2: bar2\n'
        )).to.equal(
            'application.params.[foo].name=foo\n' +
            'application.params.[foo].value=bar\n' +
            'application.params.[foo2].name=foo2\n' +
            'application.params.[foo2].value=bar2\n'
        );
    })

    it('converts a nested property from yaml', function () {
        expect(rdaProperties.fromYaml(
            'nested:\n' +
            '  foo: bar'
        )).to.equal(
            'application.params.[nested.foo].name=nested.foo\n' +
            'application.params.[nested.foo].value=bar\n'
        );
    })

    it('converts an array from yaml', function () {
        expect(rdaProperties.fromYaml(
            'foo:\n' +
            '  - bar\n' +
            '  - yep\n'
        )).to.equal(
            'application.params.[foo.0].name=foo.0\n' +
            'application.params.[foo.0].value=bar\n' +
            'application.params.[foo.1].name=foo.1\n' +
            'application.params.[foo.1].value=yep\n'
        );
    })

    it('converts complete yaml', function () {
        expect(rdaProperties.fromYaml(`
remote-service:
  base-url: http://remote.service

another-service:
  base-url: https://another.service
  username: user.name
  password: password

sync:
  groups:
    #- Commented out Group
    - Group # comment
  cron: 0 0 * * * *            
        `)).to.equal(`application.params.[remote-service.base-url].name=remote-service.base-url
application.params.[remote-service.base-url].value=http://remote.service
application.params.[another-service.base-url].name=another-service.base-url
application.params.[another-service.base-url].value=https://another.service
application.params.[another-service.username].name=another-service.username
application.params.[another-service.username].value=user.name
application.params.[another-service.password].name=another-service.password
application.params.[another-service.password].value=password
application.params.[sync.groups.0].name=sync.groups.0
application.params.[sync.groups.0].value=Group
application.params.[sync.cron].name=sync.cron
application.params.[sync.cron].value=0 0 * * * *
`);
    })
});