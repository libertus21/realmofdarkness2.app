export const chronicle_update = {
  name: "UPDATE_CHRONICLE",
  async execute(data, contextSetters) {
    contextSetters.setChronicles((prevChronicles) => {
      return { ...prevChronicles, [data.chronicle.id]: data.chronicle };
    });
  },
};
