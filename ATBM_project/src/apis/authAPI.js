import instance from "./apiConfig";
const registerAPI = async (data) => {
  console.log("🚀 ~ registerAPI ~ data:", data);

  //   const response = await instance.post("/user", data);

  //   return response.data;
};

export const authAPI = {
  registerAPI,
};
