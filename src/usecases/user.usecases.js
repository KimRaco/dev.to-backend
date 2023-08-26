import bcrypt from '../libs/bcrypt.js';
import { User } from '../models/user.model.js';

const getAllUsers = () => {
  return User.find( {} ,{ password: 0, email: 0});
};

const getUserById = (userId) => {
  return User.findById(userId, { password: 0, email: 0 });
};

const createUser = async (userData) => {
  const { email, password } = userData;
  const userExist = await User.findOne( { email: email} );

  if (userExist) throw new Error('Ya existe un registro con ese email');

  const encriptedPassword = await bcrypt.hash(password);

  return User.create({ ...userData, password: encriptedPassword} );
};

const updateUserById = (userId, dataToUpdate) => {
  return User.findByIdAndUpdate(
    userId, 
    dataToUpdate, 
    { new: true, projection: { password: 0, email: 0 } }
    );
};

const deleteUserById = (userId) => {
  return User.findByIdAndDelete(userId);
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
};