const bcrypt = require('bcrypt');


const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      //console.log(password);
      for (let i = 0; i < users.length; i++) {
        const matches = bcrypt.compareSync(password, users[i].passwordHash);
        if (users[i].username === username && matches){
          console.log("Success!");
          let userToReturn = {...users[i]};
          //delete userToReturn.passwordHash;
          res.status(200).send(userToReturn)
          return;
        }
      }
      res.status(400).send("User not found.")
    },
    
    register: (req, res) => {
        console.log('Registering User')
        const{username, email, firstName, lastName, password} = req.body;
        const salt = bcrypt.genSaltSync(5);
        const passwordHash = bcrypt.hashSync(password, salt);

        //console.log(password);
        //console.log(passwordHash);

        let userObj = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        users.push(userObj);
        console.log(userObj);
        //console.log(req.body)
        //users.push(req.body)
        res.status(200).send(req.body)
    }
}