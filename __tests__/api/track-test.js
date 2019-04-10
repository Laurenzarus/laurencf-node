const frisby = require('frisby');

const {Joi} = frisby;

//patch when can't find
it('should return status code of 404 when the track is not found', () => {
    return frisby
        .patch('http://laurencf-node.herokuapp.com/api/tracks/0', {
            name: "Titled Track",
            milliseconds: 45,
            unitPrice: 5.99
        })
        .expect('status', 404);
});

//check success patch
it('should successfully patch a track and return status code and updates', () => {

    return frisby.patch('http://laurencf-node.herokuapp.com/api/tracks/5', {
            name: "Princess of the Moon",
            milliseconds: 123456,
            unitPrice: 4.242
        })
        .expect('status', 200)
        .expect('json', 'name', 'Princess of the Moon')
        .expect('json', 'milliseconds', 123456)
        .expect('json', 'unitPrice', 4.242);

});

//Validation
it('should return a status code 422 since validation fails on all three pieces of data here', () => {

    return frisby.patch('http://laurencf-node.herokuapp.com/api/tracks/6', {
        name: "",
        milliseconds: "a",
        unitPrice: 'b'
    })
    .expect('status', 422)
    .expect('json', 'errors', [
        {
            "attribute": "name",
            "message": "Track Name required"
        },
        {
            "attribute": "milliseconds",
            "message": "Milliseconds must be numeric"
        },
        {
            "attribute": "unitPrice",
            "message": "Unit Price must be numeric"
        }
    ]);

});

