import Snacks from '../../app/models/snacksModel.js';
import db from '../database_config.js';

// Define seed data
const snacksSeedData = [
  {
    name: 'Snickers',
    imageId: 1,
    ingredients: '',
    price: 199,
    stock: 3,
  },
  {
    name: 'Torcida',
    imageId: 2,
    ingredients: '',
    price: 199,
    stock: 3,
  },
  {
    name: 'Bis',
    imageId: 3,
    ingredients: '',
    price: 699,
    stock: 3,
  },
  {
    name: 'M&M',
    imageId: 4,
    ingredients: '',
    price: 499,
    stock: 3,
  },
  {
    name: 'Trento',
    imageId: 5,
    ingredients: '',
    price: 349,
    stock: 3,
  },
  {
    name: 'Club Social',
    imageId: 6,
    ingredients: '',
    price: 599,
    stock: 3,
  },
];

export async function seedSnacks() {
  try {
    // Sync the model with the database to ensure the table exists
    await db.sync();

    // Seed data into the Snacks table
    await Snacks.bulkCreate(snacksSeedData);

    console.log('Snacks seeded successfully.');
  } catch (error) {
    console.error('Error seeding Snacks:', error);
  }
}