import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './db.js';

class User {
    async registerUser(request, response) {
        try {
          const { email, password } = request.body;
          const hashedPassword = await bcrypt.hash(password, 10);
          const selectUserQuery = `SELECT * FROM user WHERE email = '${email}'`;
          const dbUser = await db.get(selectUserQuery);
          // console.log(dbUser);
          if (dbUser === undefined) {
            const createUserQuery = `
                INSERT INTO
                    user ( email,password)
                VALUES
                    (  
                        '${email}',
                        '${hashedPassword}'
                    )
                    `;
            await db.run(createUserQuery);
            response.send("User created Successfully");
          } else {
            response.status = 400;
            response.send("User already exists please login");
          }
        } catch (error) {
          response.send(500);
          response.status(`${error} : Internal Server Error`);
        }
    }
}

const userObject = new User();
export default userObject;
