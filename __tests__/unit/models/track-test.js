const {expect} = require('chai');
const Track = require('./../../../models/track');

describe('milliseconds', () => {
    //milliseconds check, not correct
    it('milliseconds should be a numeric value', async () => {
        try {
            let track = new Track({milliseconds: "hello"});
            await track.validate();
        } catch(error) {
            expect(error.errors[0].message).to.equal('Milliseconds must be numeric');
        }
    });
    //milliseconds check, correct. If correct won't throw any errors and complete execution
    it('should be fine if milliseconds is numeric', async () => {
        try {
            let track = new Track({milliseconds: 12345});
            await track.validate();
        } catch(error) {
            expect(error.errors[0].message).to.equal('Milliseconds must be numeric');
        }
    });

});