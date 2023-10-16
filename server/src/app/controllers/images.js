import ImagesRepository from "../models/imagesModel.js";

function findAll(req, res) {
  ImagesRepository.findAll().then((result) => res.json(result));
}

export default { findAll };
