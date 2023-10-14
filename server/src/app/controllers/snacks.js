import Snacks from "../models/snacksModel.js";
import Images from "../models/imagesModel.js";
import Children from "../models/childrenModel.js";
import Parents from '../models/parentsModel.js';
import ChildSnackOrders from "../models/childSnackOrdersModel.js";
import { getMoneySpentToday } from '../../helpers/getMoneySpentToday.js';

async function findAll(req, res) {
  const snacks = await Snacks.findAll({
    attributes: { exclude: ['imageId', 'ingredients', 'createdAt', 'updatedAt'] },
    include: [
      { model: Images, as: 'image', attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ]
  })

  return res.status(200).json(snacks);
}

async function purchase(req, res) {
  const snack_id = parseInt(req.params.snack_id, 10);
  const { child_id } = req.user;

  // Check if child is allowed to buy this snack
  const child = await Children.findByPk(child_id, {
    include: [
      { 
        model: Snacks,
        as: 'AllowedSnacks',
        attributes: { exclude: ['createdAt', 'updatedAt', 'imageId', 'ingredients', 'price', 'stock', 'name'] },
        through: { attributes: [] },
      },
    ]
  });

  if(child?.AllowedSnacks?.map((snack) => snack.id).indexOf(snack_id) < 0) {
    return res.status(403).send("Child is not allowed to buy this snack");
  }

  // Check if snack is available
  const snack = await Snacks.findByPk(snack_id);
  if(snack.stock < 1) {
    return res.status(500).send("There's no stock for this snack");
  }

  // Check if child has enough budget
  const moneySpent = await getMoneySpentToday(child)
  if((child.budget - moneySpent) < snack.price) {
    return res.status(500).send("Child doesn't have enough budget to buy this snack");
  }

  // Check if parent has enough money
  const parent = await Parents.findByPk(child.parentId);
  if(parent && parent.balance < snack.price) {
    return res.status(500).send("Parent doesn't have enough balance to buy this snack");
  }

  // Buy snack
  const order = await ChildSnackOrders.create({
    childId: child.id,
    snackId: snack.id,
    price: snack.price,
  })
  
  if(order) {
    snack.stock--;
    await snack.save();
    parent.balance -= snack.price;
    await parent.save();
    return res.status(200).json(order);
  }

  return res.status(500).send("Failed to complete order");
}

async function updateStock(req, res) {
  const { id } = req.params;
  const { stock } = req.body;

  const snack = await Snacks.findByPk(id);
  if(!snack) {
    return res.status(500).send("Couldn't find snack");
  }

  try {
    snack.stock = stock;
    await snack.save();
    return res.status(200).json(snack);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Failed to update stock");
  }
}

export default { findAll, purchase, updateStock };
