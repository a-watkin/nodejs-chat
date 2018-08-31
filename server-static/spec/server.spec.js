var request = require('request')

describe('calc', () => {
    it( 'should multiply 2 and 2', () => {
        expect(2*2).toBe(4)
    })
})

describe('get messages', () => {
    // won't work unless you specify asyncronous
    // using the argument done
    it('should return 200 OK', (done) => {
        
        request.get('http://localhost:3000/messages', (err, res) => {
            console.log(res.body)
            // expect(res.statusCode === '200')
            // console.log('where is the response', res)
        })
    })
})