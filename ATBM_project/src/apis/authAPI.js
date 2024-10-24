import instance from "./apiConfig";

const registerAPI = async (data) => {
  console.log("🚀 ~ loginAPI ~ data:", data);
  const response = await instance.post("/users", data);

  return response.data;
};

export const authAPI = {
  registerAPI,
};
