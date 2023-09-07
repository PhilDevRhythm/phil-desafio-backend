import {connect} from "mongoose";
import 'dotenv/config'

export const connectionString = process.env.MONGO_LOCAL_URL;

try {
  await connect(connectionString);
  console.log("conectado a Mongo DB");
} catch (error) {
  console.log(error);
}
