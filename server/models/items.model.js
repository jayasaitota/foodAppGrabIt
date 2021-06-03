import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import mongooseFloat from 'mongoose-float';

const Float = mongooseFloat.loadType(mongoose);

/**
 * Items Schema
 */
const ItemsSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  images:{
    type:Array
  },
  categoryName:{
    type:String
  },
  price:{
    type:Float,
    default:0
  },
  ratting:{
    type:String
  },
  description:{
    type:String,
    default:''
  },
  constraints:[
    {
      name:String,
      value:{
        type:Float,
        default:0
      },
      measureingUnit:String
    }
  ],
  availableQuantity:{
    type:Number,
    default:0
  },
  totalSold:{
    type:Number,
    default:0
  },
  active:{
    type:Boolean,
    default:true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

/**
 * Statics
 */
ItemsSchema.statics = {

  /**
  * save and update item
  * @param item
  * @returns {Promise<item, APIError>}
  */
   saveDetails(item) {
    return item.save()
      .then((item) => {
        if (item) {
          return {
            sucess:"OK",
            statusCode:httpStatus.OK,
            item
          };
        }else{
          return {
            error:"OK",
            statusCode:httpStatus.NOT_FOUND,
            errMessage:"Item does't exist."
          };
        }
      });
  },
/**
     * Get item
     * @param {ObjectId} id - The objectId of item.
     * @returns {Promise<item, APIError>}
     */
 get(id) {
  return this.findById(id)
    .exec()
    .then((item) => {
      if (item) {
        return {
          sucess:"OK",
          statusCode:httpStatus.OK,
          item
        };
      }else{
        return {
          error:"OK",
          statusCode:httpStatus.NOT_FOUND,
          errMessage:"Item does't exist."
        };
      }

    });
},
/**
   * List Categories
   * @returns {Promise<Items[]>}
   */
 list(query) {
  return this.find(query.filter, query.entityFields)
    .sort(query.sorting)
    .skip((query.page - 1) * query.limit)
    .limit(query.limit)
    .exec();
},

  /**
   * Count of Items records
   * @returns {Promise<Items[]>}
   */
   totalCount(query) {
    return this.find(query.filter)
      .count();
  },
};

/**
 * @typedef Token
 */
export default mongoose.model('item', ItemsSchema);