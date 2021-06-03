
import User from '../models/user.model';
import Catrgory from '../models/category.model';
import Item from '../models/items.model';

import uploadeService from '../services/upload.service';


/**
 * 
 * @param {*} req req.quuery {contextId,contextType} 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function upload(req, res, next) {
  try{
    if(!(req.query && req.query.contextId && req.query.contextType)){
      return res.status(400).json({errMessage:"Missing Madatory fields"})
    }
    const {contextId,contextType} = req.query;
    req.uploadFile = [];
    req.uploadPath = contextType;
    if(contextType === 'user'){
      req.details = await User.findById(contextId);
    }else if(contextType === 'catogory'){
      req.details = await Catrgory.findById(contextId);
    }else if(contextType === 'item'){
      req.details = await Item.findById(contextId);
    }else{
      return res.status(400).json({errMessage:"Invalid ContextType"})
    }
    if(!req.details){
      return res.status(400).json({errMessage:`No ${contextType} record found!`})
    }
    //Calling the activity of uploading the required file
    uploadeService.upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ errMessage: "Image Upload failed!" })
      } else if (req.uploadFile && req.uploadFile[0] && req.uploadFile[0].name) {
        req.image = req.uploadFile[0].name;
        req.details.updated = Date.now();
        req.details.images = req.uploadFile;
        if(contextType === 'user'){
          req.details = await User.saveDetails(req.details);
        }else if(contextType === 'catogory'){
          req.details = await Catrgory.saveDetails(req.details);
        }else if(contextType === 'item'){
          req.details = await Item.saveDetails(req.details);
        }
        //Saving the changes of the entityType 
        return res.status(200).json({respMessage:"Image Uploaded successfully!",fileName:req.uploadFile[0].name});
      } else {
        return res.status(400).json({ errMessage: "Image Upload failed!" })
      }
    })
  }catch(err){
    console.error(err)
    return res.status(400).json({ errMessage: "Something went worng, please try again later." })
  }
}


export default {
	upload
}