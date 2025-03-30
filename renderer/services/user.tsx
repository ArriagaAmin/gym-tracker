import config from "@config";
import { Response, UserDTO } from "@objects";
import { default_error } from "@utils";
import axios from "axios";

export const getAllUsers = async (): Promise<Response<UserDTO[]>> => {
  try {
    const url = `${config.API_URL}/user`;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(url, options);

    return response.data;
  } catch (error) {
    return default_error(`Failed to get book account: ${error}`);
  }
};
