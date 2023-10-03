import ParentsRepository from "../models/parentsModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function findAll(req, res) {
  return ParentsRepository.findAll().then((result) => res.json(result));
}

function findParent(req, res) {
  if(req.user.parent_id != req.params.id){
    return res.status(401).send("Can't get information of another user");
  }
  return ParentsRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function createParent(req, res) {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }
  
    const oldUser = await ParentsRepository.findOne({ where: { email } })
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
  
    const encryptedPassword = await bcrypt.hash(password, 10);
  
    return ParentsRepository.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
    }).then((result) => res.status(201).json(result));  
  } catch(err) {
    return res.status(500).json(err);
  }
}

async function loginParent(req, res) {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    // Validate if user exist in our database
    const parent = await ParentsRepository.findOne({ where: { email } })
    if (parent && (await bcrypt.compare(password, parent.password))) {
      // Create token
      const token = jwt.sign(
        { parent_id: parent.id, email },
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


export default { findAll, createParent, findParent, loginParent };
