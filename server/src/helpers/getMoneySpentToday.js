import { Op } from 'sequelize';
import ChildSnackOrders from "../app/models/childSnackOrdersModel.js";

export async function getMoneySpentToday(child) {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);  
  
    const history = await ChildSnackOrders.findAll({
      where: {
        childId: child.id,
        createdAt: {
          [Op.gte]: startOfDay
        }
      },
      attributes: { exclude: ['id', 'updatedAt', 'childId'] },
    });
  
    const historyJson = JSON.parse(JSON.stringify(history));
    return historyJson.reduce((sum, order) => sum + order.price, 0);
  }