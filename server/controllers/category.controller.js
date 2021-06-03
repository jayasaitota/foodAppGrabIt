import Category from '../models/category.model';

import {generateListQuery} from '../utils/service.utils';

const errorResponse = { errMessage: "Something went worng, please try again later." };

/**
 * Load Category and append to req.
 * @param req
 * @param res
 * @param next
 */
const load =async (req, res,next) => {
  try{
    const {statusCode,category} = await Category.get(req.params.categoryId);
    if(statusCode == 200){
      req.category = category;
      next()
    }else{
      return res.status(400).json({errMessage:"Category not found."})
    }
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }
};

/**
 * Get Category
 * @param req
 * @param res
 * @returns {details: Category}
 */

const get =async  (req, res) => {
  try{
    let category = req.category;
    return res.status(200).json({ details:category});
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * Create new Category
 * @param req
 * @param res
 * @returns { categoryId: categoryId, respMessage: respMessage }
 */
const create =async  (req, res) => {
  try{
    const category = new Category(req.body);
    const { statusCode, category: categoryDetails } = await Category.saveDetails(category);
    if (statusCode == 200) {
      return res.status(200).json({ respMessage: "Category Create Successfully.", categoryId: categoryDetails._id})
    } else {
      return res.status(400).json(errorResponse)
    }
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * Update existing Category
 * @param req
 * @param res
 * @param next
 * @returns { categoryId: categoryId, respMessage: respMessage }
 */
const update =async (req, res) => {
  try{
    let category = req.category;
    category = Object.assign(category, req.body);
    category.updated = Date.now();
    const { statusCode, category: categoryDetails } = await Category.saveDetails(category);
    if (statusCode == 200) {
      return res.status(200).json({ respMessage: "Category Updated Successfully.", categoryId: categoryDetails._id})
    } else {
      return res.status(400).json(errorResponse)
    }
  }catch(err){
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}


/**
 * Get Category list. based on criteria
 * @param req
 * @param res
 * @param next
 * @returns {categories: categories, pagination: pagination}
 */
const list =async (req, res) => {
  try{
    const query = generateListQuery(req.query = {});
    if (query.page === 1) {
      // total count
      query.pagination.totalCount = await Category.totalCount(query);
    }
    const categories = await Category.list({query});

   return res.status(200).json({
     categories,
     pagination: query.pagination
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
 * @returns { categoryId: categoryId, respMessage: respMessage }
 */

const remove =async (req, res) => {
  try{
    let category = req.category;
    category.updated = Date.now();
    category.active = false
    const { statusCode, category: categoryDetails } = await Category.saveDetails(category);
    if (statusCode == 200) {
      return res.status(200).json({ respMessage: "Category Deleted Successfully.", categoryId: categoryDetails._id})
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
