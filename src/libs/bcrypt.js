import bcrypt from 'bcrypt';

const saltRounds = 10;

const hash = (plainText) => bcrypt.hash(plainText, saltRounds); 

export default {
  ...bcrypt,
  hash
}