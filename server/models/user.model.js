import mongoose from 'mongoose';
import crypto from 'crypto';
import httpStatus from 'http-status';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  id: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  salt:{
    type:String
  },
  images:{
    type:Array
  },
  active: {
    type: Boolean,
    default: true
  },
  refreshToken:{
    type:String
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  }
})


/**
* Hook a pre save method to hash the password
*/
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
  * Create instance method for authenticating user
  * @param {password}
  */
  authenticate(password) {
    return this.password === this.hashPassword(password);
  },

  /**
  * Create instance method for hashing a password
  * @param {password}
  */
  hashPassword(password) {
    if (this.salt && password) {
      return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
    } else {
      return password;
    }
  }
};

/**
 * Statics
 */
UserSchema.statics = {
  /**
  * save and update user
  * @param user
  * @returns {Promise<user, APIError>}
  */
  saveDetails(user) {
    return user.save()
      .then((user) => {
        if (user) {
          return {
            sucess:"OK",
            statusCode:httpStatus.OK,
            user
          };
        }else{
          return {
            error:"OK",
            statusCode:httpStatus.NOT_FOUND,
            errMessage:"User does't exist."
          };
        }
      });
  },

  /**
   * Find unique email.
   * @param {string} email.
   * @returns {Promise<user[]>}
   */
  findUniqueEmail(email) {
    email = email.toLowerCase();
    return this.findOne({
      email: email,
      active:true
    })
      .exec()
      .then((user) => user);
  }
};

export default mongoose.model('User', UserSchema);