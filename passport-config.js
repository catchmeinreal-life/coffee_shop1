import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt';
// import { initialize } from 'passport';

function initialize(passport, getUserByEmail, getUserById) {     
    const authenticateUser = async  (email, password, done) =>{
        const user = getUserByEmail(email)  //return user object or null if theres no user by that email //from database

        if (user == null){
            return done(null, false, { message : 'no user with that Email'})
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message : 'Password or email incorrect'})
            }
        } catch (error) {
            return done(error);
        }
    }
    passport.use(new LocalStrategy({
        usernameField : 'email'
    }, authenticateUser))
    passport.serializeUser((user, done)=> done(null, user.id))
    passport.deserializeUser((id, done)=> {
        return done(null, getUserById(id))
    })
};

export default initialize