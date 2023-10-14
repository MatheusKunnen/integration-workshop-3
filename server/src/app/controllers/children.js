import ChildrenRepository from "../models/childrenModel.js";
import PasswordGroupsRepository from "../models/passwordGroupsModel.js";
import jwt from 'jsonwebtoken';
import Parents from "../models/parentsModel.js";
import Images from "../models/imagesModel.js";
import PasswordGroups from "../models/passwordGroupsModel.js";
import Snacks from "../models/snacksModel.js";
import ChildSnackOrders from "../models/childSnackOrdersModel.js";

async function getByTagNumber(req, res) {
  const tagNumber = req.params.tagNumber;

  const child = await ChildrenRepository.findOne({
    where: { tagNumber }, 
    attributes: { exclude: ['createdAt', 'updatedAt', 'parentId', 'passwordGroupId', 'passwordImageId', 'name'] },
    include: [
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
        as: 'AllowedSnacks',
        attributes: { exclude: ['createdAt', 'updatedAt', 'imageId', 'ingredients', 'price', 'stock', 'name'] },
        through: { attributes: [] },
      },
    ] 
  })

  if(child) {
    const responseChild = updateChildAllowedSnacksArray(child);
    return res.status(200).json(responseChild);
  }
  return res.status(400).json("Couldn't find children");
}

async function getByParentId(req, res) {
  const id = req.user.parent_id

  const children = await ChildrenRepository.findAll({
    where: { parentId: id }, 
    attributes: { exclude: ['createdAt', 'updatedAt', 'parentId', 'passwordGroupId', 'passwordImageId'] },
    include: [
      { 
        model: Parents, 
        as: 'parent',
        attributes: { exclude: ['password', 'balance', 'createdAt', 'updatedAt'] },
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
        as: 'AllowedSnacks',
        attributes: { exclude: ['createdAt', 'updatedAt', 'imageId', 'ingredients', 'price', 'stock', 'name'] },
        through: { attributes: [] },
      },
    ] 
  })

  if(children) {
    const responseChildren = children.map(child => updateChildAllowedSnacksArray(child));
    return res.status(200).json(responseChildren);
  }
  return res.status(400).json("Couldn't find any children");
}

async function createChild(req, res) {
  try {
    const { passwordImageId, passwordGroupId, name, tagNumber, budget, allowedSnacks } = req.body
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
  
    const newChild = await ChildrenRepository.create({
      parentId,
      passwordImageId,
      passwordGroupId,
      name,
      tagNumber,
      budget
    });

    // Associate the Child with the AllowedSnacks
    if (allowedSnacks && allowedSnacks.length > 0) {
      await newChild.addAllowedSnacks(allowedSnacks);
      await newChild.save();
    }

    const childWithAllowedSnacks = await ChildrenRepository.findByPk(newChild.id, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'parentId', 'passwordGroupId', 'passwordImageId'] },
      include: [
        { 
          model: Parents, 
          as: 'parent',
          attributes: { exclude: ['password', 'balance', 'createdAt', 'updatedAt'] },
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
          as: 'AllowedSnacks',
          attributes: { exclude: ['createdAt', 'updatedAt', 'imageId', 'ingredients', 'price', 'stock', 'name'] },
          through: { attributes: [] },
        },
      ] 
    });

    if(childWithAllowedSnacks) {
      const responseChild = updateChildAllowedSnacksArray(childWithAllowedSnacks);
      return res.status(201).json(responseChild); 
    }
    return res.status(500).send("Error");
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
        as: 'AllowedSnacks',
        attributes: { exclude: ['createdAt', 'updatedAt', 'imageId', 'ingredients', 'price', 'stock', 'name'] },
        through: { attributes: [] },
      },
    ] 
  })
  if(updatedChild) {
    const responseChild = updateChildAllowedSnacksArray(updatedChild);
    return res.status(200).json(responseChild);
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

async function updateBudget(req, res) {
  const { id } = req.params;
  const { budget } = req.body;

  if(!(budget != undefined)) {
    return res.status(400).send("The budget is required");
  } 

  const child = await ChildrenRepository.findByPk(id);
  if(!child) {
    return res.status(404).send("Child not found");
  }

  if(req.user.parent_id != child.parentId){
    return res.status(401).send("You can't update a child that isn't yours");
  }

  child.budget = budget;
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
        as: 'AllowedSnacks',
        attributes: { exclude: ['createdAt', 'updatedAt', 'imageId', 'ingredients', 'price', 'stock', 'name'] },
        through: { attributes: [] },
      },
    ] 
  })
  if(updatedChild) {
    const responseChild = updateChildAllowedSnacksArray(updatedChild);
    return res.status(200).json(responseChild);
  }

  return res.status(500);
}

async function updateAllowedSnacks(req, res) {
  const { id } = req.params;
  const { allowedSnacks } = req.body;

  const child = await ChildrenRepository.findByPk(id, {
    include: [
      { 
        model: Snacks,
        as: 'AllowedSnacks',
        attributes: { exclude: ['createdAt', 'updatedAt', 'imageId', 'ingredients', 'price', 'stock', 'name'] },
        through: { attributes: [] },
      },
    ]
  });

  if(!child) {
    return res.status(404).send("Child not found");
  }

  if(req.user.parent_id != child.parentId){
    return res.status(401).send("You can't update a child that isn't yours");
  }

  const oldAllowedSnacks = child?.AllowedSnacks?.map((snack) => snack.id);
  await child.removeAllowedSnacks(oldAllowedSnacks);
  await child.addAllowedSnacks(allowedSnacks);
  await child.save();

  const updatedChild = await ChildrenRepository.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt', 'parentId', 'passwordGroupId', 'passwordImageId'] },
    include: [
      { 
        model: Parents, 
        as: 'parent',
        attributes: { exclude: ['password', 'balance', 'createdAt', 'updatedAt'] },
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
        as: 'AllowedSnacks',
        attributes: { exclude: ['createdAt', 'updatedAt', 'imageId', 'ingredients', 'price', 'stock', 'name'] },
        through: { attributes: [] },
      },
    ] 
  })

  if(updatedChild) {
    const responseChild = updateChildAllowedSnacksArray(updatedChild);
    return res.status(200).json(responseChild)
  }
}

async function getOrderHistory(req, res) {
  const { id } = req.params;

  const child = await ChildrenRepository.findByPk(id);

  if(!child) {
    return res.status(404).send("Child not found");
  }

  if(req.user.parent_id != child.parentId){
    return res.status(401).send("You can't get the order history of a child that isn't yours");
  }

  const history = await ChildSnackOrders.findAll({
    where: {childId: id},
    attributes: { exclude: ['id', 'updatedAt', 'childId'] },
  });

  return res.status(200).json(history);
}

function updateChildAllowedSnacksArray(child) {
  const responseChild = JSON.parse(JSON.stringify(child));
  responseChild.allowedSnacks = responseChild?.AllowedSnacks?.map((snack) => snack.id);
  delete responseChild.AllowedSnacks;

  return responseChild;
}

export default { createChild, loginChild, getByTagNumber, getByParentId, updateChild, deleteChild, updateBudget, updateAllowedSnacks, getOrderHistory };
