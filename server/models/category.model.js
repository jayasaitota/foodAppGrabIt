import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

/**
 * Category Schema
 */
const CategorySchema = new mongoose.Schema({
  name:{
    type:String,
  },
  images:{
    type:Array
  },
  category:{
    type:String
  },
  created: {
    type: Date,
    default: Date.now
  },
  active:{
    type:Boolean,
    default:true
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

/**
 * Statics
 */
CategorySchema.statics = {

  /**
  * save and update category
  * @param category
  * @returns {Promise<category, APIError>}
  */
   saveDetails(category) {
    return category.save()
      .then((category) => {
        if (category) {
          return {
            sucess:"OK",
            statusCode:httpStatus.OK,
            category
          };
        }else{
          return {
            error:"OK",
            statusCode:httpStatus.NOT_FOUND,
            errMessage:"Category does't exist."
          };
        }
      });
  },

/**
     * Get category
     * @param {ObjectId} id - The objectId of category.
     * @returns {Promise<category, APIError>}
     */
   get(id) {
    return this.findById(id)
      .exec()
      .then((category) => {
        if (category) {
          return {
            sucess:"OK",
            statusCode:httpStatus.OK,
            category
          };
        }else{
          return {
            error:"OK",
            statusCode:httpStatus.NOT_FOUND,
            errMessage:"Category does't exist."
          };
        }

      });
  },

/**
   * List Categories
   * @returns {Promise<Category[]>}
   */
 list(query) {
  return this.find(query.filter, query.entityFields)
    .sort(query.sorting)
    .skip((query.page - 1) * query.limit)
    .limit(query.limit)
    .exec();
},

  /**
   * Count of Category records
   * @returns {Promise<Category[]>}
   */
   totalCount(query) {
    return this.find(query.filter)
      .count();
  },
};

/**
 * @typedef Token
 */
export default mongoose.model('category', CategorySchema);