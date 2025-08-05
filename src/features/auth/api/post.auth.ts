import axios from "axios";
import { IRegisterArgs } from "../type";

export async function RegisterService(params: IRegisterArgs) {
  try {
    await axios.post("http://localhost:8080/api/users", {
      name: params.name,
      email: params.email,
      password: params.password,
    });
  } catch (err: any) {
    throw err;
  }
}
