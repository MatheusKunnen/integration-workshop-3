import ChildrenRepository from "../models/childrenModel.js";
import PasswordGroupsRepository from "../models/passwordGroupsModel.js";
import jwt from 'jsonwebtoken';
import Parents from "../models/parentsModel.js";
import Images from "../models/imagesModel.js";
import PasswordGroups from "../models/passwordGroupsModel.js";
import Snacks from "../models/snacksModel.js";

function findAll(req, res) {
  ChildrenRepository.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'parentId', 'passwordGroupId', 'passwordImageId'] },
    include: [
      { 
        model: Parents, 
        as: 'parent',
        attributes: { exclude: ['password', 'balance', 'createdAt', 'updatedAt'] },
      },
      { 
        model: Images, 
        as: 'passwordImage',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      {
        model: PasswordGroups,
        as: 'passwordGroup',
        attributes: { exclude: ['image1Id', 'image2Id', 'image3Id', 'image4Id', 'image5Id', 'image6Id', 'createdAt', 'updatedAt'] },
        include: [
          { model: Images, as: 'image1', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image2', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image3', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image4', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image5', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image6', attributes: { exclude: ['createdAt', 'updatedAt'] } },
        ],
      },
      { 
        model: Snacks, 
        through: 'ChildAllowedSnacks' 
      },
    ] 
  }).then((result) => res.json(result));
}

async function getByTagNumber(req, res) {
  const tagNumber = req.params.tagNumber;
  const child = await ChildrenRepository.findOne({
    where: { tagNumber }, 
    attributes: { exclude: ['createdAt', 'updatedAt', 'parentId', 'passwordGroupId', 'passwordImageId'] },
    include: [
      { 
        model: Parents, 
        as: 'parent',
        attributes: { exclude: ['password', 'balance', 'createdAt', 'updatedAt'] },
      },
      { 
        model: Images, 
        as: 'passwordImage',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      {
        model: PasswordGroups,
        as: 'passwordGroup',
        attributes: { exclude: ['image1Id', 'image2Id', 'image3Id', 'image4Id', 'image5Id', 'image6Id', 'createdAt', 'updatedAt'] },
        include: [
          { model: Images, as: 'image1', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image2', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image3', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image4', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image5', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image6', attributes: { exclude: ['createdAt', 'updatedAt'] } },
        ],
      },
      { 
        model: Snacks, 
        through: 'ChildAllowedSnacks' 
      },
    ] 
  })
  if(child) {
    return res.status(200).json({ child });
  }
  return res.status(400).json("Couldn't find children");
}

async function getByParentId(req, res) {
  const id = req.params.id;

  if(req.user.parent_id != id){
    return res.status(401).send("You can't see another parent's children. Use your ID");
  }

  const child = await ChildrenRepository.findAll({
    where: { parentId: id }, 
    attributes: { exclude: ['createdAt', 'updatedAt', 'parentId', 'passwordGroupId', 'passwordImageId'] },
    include: [
      { 
        model: Parents, 
        as: 'parent',
        attributes: { exclude: ['password', 'balance', 'createdAt', 'updatedAt'] },
      },
      { 
        model: Images, 
        as: 'passwordImage',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      {
        model: PasswordGroups,
        as: 'passwordGroup',
        attributes: { exclude: ['image1Id', 'image2Id', 'image3Id', 'image4Id', 'image5Id', 'image6Id', 'createdAt', 'updatedAt'] },
        include: [
          { model: Images, as: 'image1', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image2', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image3', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image4', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image5', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image6', attributes: { exclude: ['createdAt', 'updatedAt'] } },
        ],
      },
      { 
        model: Snacks, 
        through: 'ChildAllowedSnacks' 
      },
    ] 
  })
  if(child) {
    return res.status(200).json({ child });
  }
  return res.status(400).json("Couldn't find any children");
}

async function createChild(req, res) {
  try {
    const { passwordImageId, passwordGroupId, name, tagNumber, budget } = req.body
    const parentId = req.user.parent_id;

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

async function updateChild(req, res) {
  const { id } = req.params;
  const {
    name,
    tagNumber,
    passwordImageId
  } = req.body;

  if(!(passwordImageId != undefined && 
       name != undefined && 
       tagNumber != undefined
  )) {
    return res.status(400).send("name, tagNumber and passwordImageId are required");
  } 

  const child = await ChildrenRepository.findByPk(id);
  if(!child) {
    return res.status(404).send("Child not found");
  }

  if(req.user.parent_id != child.parentId){
    return res.status(401).send("You can't update a child that isn't yours");
  }

  // If tagNumber is being updated, check if there is already a child with same tag number
  if(child.tagNumber != tagNumber) {
    const childWithSameTagNumber = await ChildrenRepository.findOne({ where: { tagNumber } })
    if (childWithSameTagNumber) {
      return res.status(409).send("There's already a child with this tagNumber");
    }
  }

  child.name = name;
  child.tagNumber = tagNumber;
  child.passwordImageId = passwordImageId;
  await child.save();

  const updatedChild = await ChildrenRepository.findOne({
    where: { id }, 
    attributes: { exclude: ['createdAt', 'updatedAt', 'parentId', 'passwordGroupId', 'passwordImageId'] },
    include: [
      { 
        model: Parents, 
        as: 'parent',
        attributes: { exclude: ['password', 'balance', 'createdAt', 'updatedAt'] },
      },
      { 
        model: Images, 
        as: 'passwordImage',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      {
        model: PasswordGroups,
        as: 'passwordGroup',
        attributes: { exclude: ['image1Id', 'image2Id', 'image3Id', 'image4Id', 'image5Id', 'image6Id', 'createdAt', 'updatedAt'] },
        include: [
          { model: Images, as: 'image1', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image2', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image3', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image4', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image5', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Images, as: 'image6', attributes: { exclude: ['createdAt', 'updatedAt'] } },
        ],
      },
      { 
        model: Snacks, 
        through: 'ChildAllowedSnacks' 
      },
    ] 
  })
  if(updatedChild) {
    return res.status(200).json({ child: updatedChild });
  }

  return res.status(500);
}

async function deleteChild(req, res) {
  const { id } = req.params;

  const child = await ChildrenRepository.findByPk(id);
  if(!child) {
    return res.status(404).send("Child not found");
  }

  if(req.user.parent_id != child.parentId){
    return res.status(401).send("You can't delete a child that isn't yours");
  }

  await child.destroy();

  return res.status(204).send(); 
}

export default { findAll, createChild, loginChild, getByTagNumber, getByParentId, updateChild, deleteChild };
