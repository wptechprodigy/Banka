import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index';
import dummyDB from '../api/utils/dummyDB';

chai.should();

chai.use(chaiHttp);

describe('Tesing user endpoints', () => {
  const signupUrl = '/api/v1/auth/signup';
  const signinUrl = '/api/v1/auth/signin';
  /**
	 * @Signup endpoint with all reuired parameters
	 */
  describe('POST /auth/signup', () => {
    it('should register a new user when all the parameters are given', (done) => {
      const newUser = {
        firstName: 'Larry',
        lastName: 'King',
        email: 'larryking@king.com',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post(signupUrl)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('firstName').eql('Larry');
          res.body.data.should.have.property('lastName').eql('King');
          res.body.data.should.have.property('email').eql('larryking@king.com');
          done();
        });
    });

    it('should not register a new user when first name is not provided', (done) => {
      const newUser = {
        lastName: 'King',
        email: 'larryking@king.com',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post(signupUrl)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have
            .property('message')
            .eql('All fields are required. Check to ensure all fields are filled');
          done();
        });
    });

    it('should not register a new user when last name is not provided', (done) => {
      const newUser = {
        firstName: 'Larry',
        email: 'larryking@king.com',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post(signupUrl)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have
            .property('message')
            .eql('All fields are required. Check to ensure all fields are filled');
          done();
        });
    });

    // it('should not register a new user when password fields do not match', (done) => {
    //   const newUser = {
    //     firstName: 'Larry',
    //     lastName: 'King',
    //     email: 'larryking@king.com',
    //     password: 'passwrod12',
    //     confirmPassword: 'password',
    //   };
    //   if (newUser.password !== newUser.confirmPassword) {
    //     chai
    //       .request(app)
    //       .post(signupUrl)
    //       .send(newUser)
    //       .end((err, res) => {
    //         res.should.have.status(400);
    //         res.body.should.be.a('object');
    //         res.body.should.have.property('status').eql(400);
    //         res.body.should.have.property('message').eql('Passwords do not match');
    //         done();
    //       });
    //   }
    // });

    it('should not register a new user when email is not provided', (done) => {
      const newUser = {
        firstName: 'Larry',
        lastName: 'King',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post(signupUrl)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have
            .property('message')
            .eql('All fields are required. Check to ensure all fields are filled');
          done();
        });
    });

    it('should not register a new user when an email is already in use', (done) => {
      const newUser = {
        firstName: 'Larry',
        lastName: 'King',
        email: 'j.snow@targearyean.got',
        password: 'password',
        confirmPassword: 'password',
      };
      const existingEmail = dummyDB.users.find(user => user.email === newUser.email);
      if (existingEmail) {
        chai
          .request(app)
          .post(signupUrl)
          .send(newUser)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('message').eql('Email is already taken');
            done();
          });
      }
    });

    it('should not register a new user when password is not provided', (done) => {
      const newUser = {
        firstName: 'Larry',
        lastName: 'King',
        email: 'larryking@king.com',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post(signupUrl)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have
            .property('message')
            .eql('All fields are required. Check to ensure all fields are filled');
          done();
        });
    });
  });
  /**
	 *
	 * @signin
	 */
  describe('POST /auth/signin', () => {
    it('should login an existing user when all the parameters are given', (done) => {
      // Specifying a user
      const newUser = {
        firstName: 'Larry',
        lastName: 'King',
        email: 'larryking@king.com',
        password: 'password',
        confirmPassword: 'password',
      };
      // Using required data for login
      const incomingLoginData = {
        email: 'larryking@king.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(signinUrl)
        .send(incomingLoginData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('firstName').eql(`${newUser.firstName}`);
          res.body.data.should.have.property('lastName').eql(`${newUser.lastName}`);
          res.body.data.should.have.property('email').eql(`${newUser.email}`);
          done();
        });
    });
  });

  it('should not login user when email is not provided', (done) => {
    const incomingLoginData = {
      password: 'password',
    };
    chai
      .request(app)
      .post(signinUrl)
      .send(incomingLoginData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Email is required');
        done();
      });
  });

  it('should not login user when password is not provided', (done) => {
    const incomingLoginData = {
      email: 'larryking@king.com',
    };
    chai
      .request(app)
      .post(signinUrl)
      .send(incomingLoginData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('message').eql('Password is required');
        done();
      });
  });

  // it('should not login user when a non registered email is provided', (done) => {
  //   // Using required data for login
  //   const incomingLoginData = {
  //     email: 'larryking23@king.com',
  //     password: 'password',
  //   };
  //   const existingUSer = dummyDB.users.find(user => user.email === incomingLoginData.email);
  //   if (existingUSer.email !== incomingLoginData.email) {
  //     chai
  //       .request(app)
  //       .post(signinUrl)
  //       .send(incomingLoginData)
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('status').eql(400);
  //         res.body.should.have.property('message').eql('Email is not known');
  //         done();
  //       });
  //   }
  // });
});
