import PasswordGroups from '../../app/models/passwordGroupsModel.js';
import db from '../database_config.js';

// Define seed data
const passwordGroupsSeedData = [
  { 
    image1Id: 7, 
    image2Id: 8, 
    image3Id: 9, 
    image4Id: 10, 
    image5Id: 11, 
    image6Id: 12, 
  },
  { 
    image1Id: 13, 
    image2Id: 14, 
    image3Id: 15, 
    image4Id: 16, 
    image5Id: 17, 
    image6Id: 18, 
  },
  { 
    image1Id: 19, 
    image2Id: 20, 
    image3Id: 21, 
    image4Id: 22, 
    image5Id: 23, 
    image6Id: 24, 
  },
];

export async function seedPasswordGroups() {
  try {
    // Sync the model with the database to ensure the table exists
    await db.sync();

    // Seed data into the PasswordGroups table
    await PasswordGroups.bulkCreate(passwordGroupsSeedData);

    console.log('Password Groups seeded successfully.');
  } catch (error) {
    console.error('Error seeding Password Groups:', error);
  }
}

