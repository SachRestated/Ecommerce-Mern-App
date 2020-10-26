const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('passwodr0', 10),
        isAdmin: true,
    }, 
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('passwodr1', 10),
        isAdmin: true,
    }, 
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('passwodr2', 10),
        isAdmin: true,
    }, 

]

module.exports = users