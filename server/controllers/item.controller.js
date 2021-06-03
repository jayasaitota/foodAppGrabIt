import Item from '../models/items.model';


import {generateListQuery} from '../utils/service.utils';

const errorResponse = { errMessage: "Something went worng, please try again later." };


/**
 * Load Item and append to req.
 * @param req
 * @param res
 * @param next
 */
const load =async (req, res,next) => {
  try{
    const {statusCode,item} = await Item.get(req.params.itemId);
    if(statusCode == 200){
      req.item = item;
      next()
    }else{
      return res.status(400).json({errMessage:"Item not found."})
    }
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }

};

/**
 * Get Item
 * @param req
 * @param res
 * @returns {details: item}
 */

const get =async  (req, res) => {
  try{
    let item = req.item;
    return res.status(200).json({ details:item});
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * Create new Item
 * @param req
 * @param res
 * @returns { itemId: itemId, respMessage: respMessage }
 */
const create =async  (req, res) => {
  try{
    const item = new Item(req.body);
    const { statusCode, item: itemDetails } = await Item.saveDetails(item);
    if (statusCode == 200) {
      return res.status(200).json({ respMessage: "Item Create Successfully.", itemId: itemDetails._id})
    } else {
      return res.status(400).json(errorResponse)
    }
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * Update existing Item
 * @param req
 * @param res
 * @param next
 * @returns { itemId: itemId, respMessage: respMessage }
 */
const update =async (req, res) => {
  try{
    let item = req.item;
    item = Object.assign(item, req.body);
    item.updated = Date.now();
    const { statusCode, item: itemDetails } = await Item.saveDetails(item);
    if (statusCode == 200) {
      return res.status(200).json({ respMessage: "Item Updated Successfully.", itemId: itemDetails._id})
    } else {
      return res.status(400).json(errorResponse)
    }
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * Get Item list. based on criteria
 * @param req
 * @param res
 * @param next
 * @returns {items: items, pagination: pagination}
 */
const list =async (req, res) => {
  try{
    const query = generateListQuery(req.query = {});
    if (query.page === 1) {
      // total count
      query.pagination.totalCount = await Item.totalCount(query);
    }
    const items = await Item.list({query});

    return res.status(200).json({
      items,
      pagination:query.pagination
     });
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * Delete Category.
 * @param req
 * @param res
 * @param next
 * @returns { itemId: itemId, respMessage: respMessage }
 */
const remove =async (req, res) => {
  try{
    let item = req.item;
    item.updated = Date.now();
    item.active = false
    const { statusCode, item: itemDetails } = await Item.saveDetails(item);
    if (statusCode == 200) {
      return res.status(200).json({ respMessage: "Item Deleted Successfully.", itemId: itemDetails._id})
    } else {
      return res.status(400).json(errorResponse)
    }
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove
}
