import SnacksRepository from "../models/snacksModel.js";
import Images from "../models/imagesModel.js";

function findAll(req, res) {
  SnacksRepository.findAll({
    attributes: { exclude: ['imageId', 'ingredients', 'createdAt', 'updatedAt'] },
    include: [
      { model: Images, as: 'image', attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ]
  }).then((result) => res.json(result));
}

export default { findAll };
