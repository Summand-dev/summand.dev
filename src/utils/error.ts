export const errorToDict = (res) => {
  const errorDict = {};
  if (res.response && res.response.data && res.response.data.detail) {
    const error = res.response.data.detail;
    if (Array.isArray(error)) {
      for (const e of error) {
        errorDict[e.loc[1]] = { loc: e.loc[1], text: e.msg };
      }
    } else {
      errorDict["generic"] = { loc: "error", text: error };
    }
  }
  return errorDict;
};
