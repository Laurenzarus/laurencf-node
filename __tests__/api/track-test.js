const frisby = require('frisby');

const {Joi} = frisby;

it('should return status code of 404 when the track is not found', () => {
    return frisby
        .patch('http://laurencf-node.herokuapp.com/api/tracks/0', {
            // name: "Titled Track",
            // milliseconds: 45,
            // unitPrice: 5.99
        })
        .expect('status', 404);
});

// it('should create a new artist when the POST request finishes', () => {

//     return frisby.post('')

// });