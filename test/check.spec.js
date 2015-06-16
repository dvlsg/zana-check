import check from '../dist/check.js';

describe('Check', () => {
    it('will be determined', () => {
        if (!check.is([], Array))
            throw new Error('fail!');
    });
});
