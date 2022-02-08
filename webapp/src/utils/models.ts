export const predefinedModels = new Map([['Linear Regression', 'bafkreicliqylyoblfo7clpzkmycwfqn567qbawnffduekcvawl3czoti2u']]);
// Create reverse mapping
const cidToName = new Map(Array.from(predefinedModels, (e) => [e[1], e[0]]));

export const getNameOfCID = (cid: string): string => {
  const name = cidToName.get(cid);
  if (name) {
    return name;
  }
  return 'Custome';
};
