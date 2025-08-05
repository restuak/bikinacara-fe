import axios from "axios";
import { ILoginArgs } from "../type";

export async function LoginService(params: ILoginArgs) {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/users?where=email%3D'${params.email}'%26%26password%3D'${params.password}'`
    );

    return data[0];
  } catch (err) {
    throw err;
  }
}
