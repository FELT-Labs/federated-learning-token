export const predefinedModels = new Map([
  ['Linear Regression', 'bafkreicliqylyoblfo7clpzkmycwfqn567qbawnffduekcvawl3czoti2u'],
  ['SGD Linear Regressor', 'bafkreidwhstncqot2j7bbp25z2kzrexcmysovvrkv3wbytlk4l3iidlodm'],
  ['Logistic Regression', 'bafkreicv5fodgpk423tbcmbxdqsarwysqug32g5b27f4gzruavt5vtku2i'],
  ['SGD Classifier', 'bafkreiem6k7aylre7ux23xs2wa2wjvkotnbwfavr2nmudowb476a55jb3e'],
]);
// Create reverse mapping
const cidToName = new Map(Array.from(predefinedModels, (e) => [e[1], e[0]]));

export const getNameOfCID = (cid: string): string => {
  const name = cidToName.get(cid);
  if (name) {
    return name;
  }
  return 'Custome';
};
