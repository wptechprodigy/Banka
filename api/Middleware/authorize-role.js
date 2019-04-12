import expressJWT from 'express-jwt';
import secret from '../utils/jwt_secret';

const authorizeRoles = (roles = []) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    expressJWT({ secret }),

    // authorize based on the user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({
          status: 401,
          message: 'You are not authorized',
        });
      }

      // authentication and authorization successful
      next();
    },
  ];
};

export default authorizeRoles;
