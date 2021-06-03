import User from '../models/user.model';

import {removeTokenAndSaveNewToken} from '../services/token.service';

import {generateUUID} from '../utils/service.utils';

const errorResponse = { errMessage: "Something went worng, please try again later." };

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {message, userId,id}
 */
const create = async (req, res) => {
  try {
    const user = new User(req.body);

    //Generate  Random Id for users
    user.id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    user.refreshToken = generateUUID(`${req.body.email}:${(new Date()).getTime().toString(36)}`);

    if (await User.findUniqueEmail(req.body.email)) {
      return res.status(400).json({ errMessage: "Email already existes" })
    }
    const { statusCode, user: UserDetails } = await User.saveDetails(user);
    UserDetails.password = undefined;
    UserDetails.salt = undefined;
    if (statusCode == 200) {
      return res.status(200).json({ sucessMessage: "User Create Successfully.", userId: UserDetails._id, id:UserDetails.id })
    } else {
      return res.status(400).json(errorResponse)
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {message,accesstoken}
 */
const login  = async (req,res)=>{
  try{
  const {email,password} = req.body;
   const user = await User.findUniqueEmail(email);
   if(!user){
    return res.status(400).json({errMessage:"Please enter valid email"});
   }
    // compare authenticate password for user
    if (!user || !user.authenticate(password)) {
      return res.status(400).json({errMessage:"Please enter valid password"});
    }
    req.user = user;
    req.user.password = undefined;
    req.user.salt = undefined;
    let {accessToken} = await removeTokenAndSaveNewToken(req)
    if(!accessToken){
      return res.status(400).json(errorResponse)
    }
    return res.status(200).json({sucessMessage:"Login Success.", accessToken:accessToken});
  }catch (err) {
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

export default {
  create,
  login
}