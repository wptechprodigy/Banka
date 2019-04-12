import expressJwt from 'express-jwt';
import 'dotenv/config';
import secret from '../utils/jwt_secret';
import UserService from '../services/users.service';

const verifyJwt = () => expressJwt({ secret, isRevoked }).unless({
  path: [
    // public routes that don't require authentication
    '/auth/signup',
    '/auth/signin',
  ],
});

async function isRevoked(req, payload, done) {
  const user = await UserService.findOneUserById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}

export default verifyJwt;
