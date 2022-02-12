const { md5 } = require('./id_generator');

describe('id generators units', () => {
    test('md5 should return 10 length hash', () => {
        const hashLength = '593210d2ffcf3f04be0cf36f25877cdb'.length;
        expect(md5('test').length).toBe(hashLength);
    });
});