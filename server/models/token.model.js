import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

/**
 * Token Schema
 */
const TokenSchema = new mongoose.Schema({
  accessToken: String,
  expires: Number,
  user:String,
  accessTokenExpireAt: Date,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

/**
 * Statics
 */
TokenSchema.statics = {

  /**
   * save and update token
   * @param token
   */
  saveDetails(token) {
    return token.save()
      .then((user) => {
        if (user) {
          return user;
        }
        return null
      });
  },

  /**
   * Find unique user token.
   * @param {objectId} userId.
   * @returns {Token}
   */
  findUniqueToken(userId) {
    return this.findOne({
      user: userId
    })
      .exec()
      .then((token) => token);
  }
};

/**
 * @typedef Token
 */
export default mongoose.model('Token', TokenSchema);