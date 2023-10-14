import PasswordGroupsRepository from "../models/passwordGroupsModel.js";
import Images from "../models/imagesModel.js";

function findAll(req, res) {
  PasswordGroupsRepository.findAll({
    attributes: { exclude: ['image1Id', 'image2Id', 'image3Id', 'image4Id', 'image5Id', 'image6Id', 'createdAt', 'updatedAt'] },
    include: [
      { model: Images, as: 'image1', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image2', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image3', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image4', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image5', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image6', attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ]
  }).then((result) => res.json(result));
}

async function getRandom(req, res) {
  const passwordGroups = await PasswordGroupsRepository.findAll({
    attributes: { exclude: ['image1Id', 'image2Id', 'image3Id', 'image4Id', 'image5Id', 'image6Id', 'createdAt', 'updatedAt'] },
    include: [
      { model: Images, as: 'image1', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image2', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image3', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image4', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image5', attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Images, as: 'image6', attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ]
  })
  if(passwordGroups && passwordGroups.length > 0) {
    // Generate a random index within the array length
    const randomIndex = Math.floor(Math.random() * passwordGroups.length);
    const randomRecord = passwordGroups[randomIndex];

    return res.status(200).json(randomRecord);
  }
  return res.status(400).json("Couldn't find password group");
}

export default { findAll, getRandom };
