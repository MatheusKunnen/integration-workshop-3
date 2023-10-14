import Images from '../../app/models/imagesModel.js';
import db from '../database_config.js';
import dotenv from "dotenv/config.js"; // importar o dotenv para localizar as variáveis de ambiente

// Define seed data
const imageSeedData = [
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/snickers.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/torcida.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/bis.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/m&m.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/trento.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/club-social.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p1i1.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p1i2.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p1i3.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p1i4.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p1i5.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p1i6.png` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p2i1.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p2i2.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p2i3.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p2i4.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p2i5.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p2i6.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p3i1.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p3i2.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p3i3.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p3i4.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p3i5.jpg` },
    { url: `http://${process.env.HOST}:${process.env.PORT}/image/p3i6.jpg` },
];

export async function seedImages() {
  try {
    // Sync the model with the database to ensure the table exists
    await db.sync();

    // Seed data into the Images table
    await Images.bulkCreate(imageSeedData);

    console.log('Images seeded successfully.');
  } catch (error) {
    console.error('Error seeding Images:', error);
  }
}

