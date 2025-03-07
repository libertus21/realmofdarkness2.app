export const user_update = {
  name: "UPDATE_USER",
  async execute(data, contextSetters) {
    contextSetters.setUser(data["user"]);
  },
};
