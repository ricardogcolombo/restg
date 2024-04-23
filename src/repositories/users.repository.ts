import { User } from '../domain/entities/activity.entities';
import logger from '../helper/logger';
import { connectDB } from '../server/db';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  accessibility: { type: Number, required: true },
  price: { type: Number, required: true }
});

interface SaveProfileInput {
  name: String;
  accessibility: Number;
  price: Number;
}

class UsersRepository {
  private User;

  constructor() {
    this.User = mongoose.model('users', userSchema);
  }

  async saveProfile(input: SaveProfileInput): Promise<User> {
    logger.info('saveProfile', { input });
    await connectDB();
    const newUser = new this.User(input);
    await newUser.save();

    return {
      name: newUser.name,
      accessibility: newUser.accessibility,
      price: newUser.price
    };
  }
}

export { UsersRepository };
