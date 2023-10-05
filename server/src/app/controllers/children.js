import ChildrenRepository from "../models/childrenModel.js";
import PasswordGroupsRepository from "../models/passwordGroupsModel.js";
import jwt from 'jsonwebtoken';

function findAll(req, res) {
  ChildrenRepository.findAll().then((result) => res.json(result));
}

async function createChild(req, res) {
  try {
    const { parentId, passwordImageId, passwordGroupId, name, tagNumber, budget } = req.body

    // Check if all inputs were given
    if(!( parentId != undefined && 
          passwordImageId != undefined && 
          passwordGroupId != undefined && 
          name != undefined && 
          tagNumber != undefined && 
          budget!= undefined
      )) 
    {
      return res.status(400).send("All inputs are required");
    }
    
    // Check if parentId is from the parent that is trying to create a child register
    if(req.user.parent_id != parentId){
      return res.status(401).send("You can't create a child for another parent. Use your ID");
    }

    // Check if there is already a child with same tag number
    const childWithSameTagNumber = await ChildrenRepository.findOne({ where: { tagNumber } })
    if (childWithSameTagNumber) {
      return res.status(409).send("There's already a child with this tagNumber");
    }

    // Check if specified password group exists
    const passwordGroupFound = await PasswordGroupsRepository.findOne({ where: { id: passwordGroupId } })
    if (!passwordGroupFound) {
      return res.status(400).send("Password Group doesn't exist");
    }

    // Check if the specified password is on password group
    if(passwordGroupFound.image1Id != passwordImageId &&
       passwordGroupFound.image2Id != passwordImageId &&
       passwordGroupFound.image3Id != passwordImageId &&
       passwordGroupFound.image4Id != passwordImageId &&
       passwordGroupFound.image5Id != passwordImageId &&
       passwordGroupFound.image6Id != passwordImageId 
    ) {
      return res.status(400).send("Image is not in the Password Group");
    }
  
    return ChildrenRepository.create({
      parentId,
      passwordImageId,
      passwordGroupId,
      name,
      tagNumber,
      budget
    }).then((result) => res.status(201).json(result));  
  } catch(err) {
    return res.status(500).json(err);
  }
}

async function loginChild(req, res) {
  try {
    const { tagNumber, passwordImageId } = req.body

    if (!(tagNumber, passwordImageId)) {
      return res.status(400).send("All inputs are required");
    }

    // Validate if child exist in our database
    const child = await ChildrenRepository.findOne({ where: { tagNumber } })
    if (child && (passwordImageId == child.passwordImageId)) {
      // Create token
      const token = jwt.sign(
        { child_id: child.id, tagNumber },
        process.env.ACCESS_TOKEN_SECRET,
        // Sem tempo de expiração
      );
      return res.status(200).json({ token });
    }
    return res.status(400).send("Invalid Credentials");
  } catch(err) {
    return res.status(500).json(err);
  }
}

export default { findAll, createChild, loginChild };
