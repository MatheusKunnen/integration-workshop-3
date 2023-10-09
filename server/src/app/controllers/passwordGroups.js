import PasswordGroupsRepository from "../models/passwordGroupsModel.js";
import Images from "../models/imagesModel.js";

function findAll(req, res) {
  PasswordGroupsRepository.findAll({
    attributes: { exclude: ['image1Id', 'image2Id', 'image3Id', 'image4Id', 'image5Id', 'image6Id', 'createdAt', 'updatedAt'] },
    include: [
      { model: Images, as: 'image1' },
      { model: Images, as: 'image2' },
      { model: Images, as: 'image3' },
      { model: Images, as: 'image4' },
      { model: Images, as: 'image5' },
      { model: Images, as: 'image6' },
    ]
  }).then((result) => res.json(result));
}

async function findOne(req, res) {
  const id = req.params.id;
  const passwordGroup = await PasswordGroupsRepository.findOne({
    where: { id },
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
  if(passwordGroup) {
    console.log(passwordGroup);
    return res.status(200).json({ passwordGroup });
  }
  return res.status(400).json("Couldn't find password group");
}

export default { findAll, findOne };
