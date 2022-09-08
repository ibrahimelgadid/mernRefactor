const uniqueRecord = async (modelNameCell, name, model, id = false) => {
  let errors = {};
  let existName;
  if (id) {
    existName = await model.findOne({
      [modelNameCell]: name,
      _id: { $ne: id },
    });
  } else {
    existName = await model.findOne({ [modelNameCell]: name });
  }

  if (existName) {
    errors[modelNameCell] = `${modelNameCell} must be unique`;
    return { uniqe: false, result: errors[modelNameCell] };
  } else {
    return { uniqe: true, result: name };
  }
};

module.exports = uniqueRecord;
