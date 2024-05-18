import Ward from '../app/models/Ward.js';
import District from '../app/models/District.js';
import City from '../app/models/City.js';

export const getAddress = async (city, district, ward) => {
  if (ward) {
    const data = await Ward.findOne({ code: ward });
    return data.path_with_type;
  }
  if (district) {
    const data = await District.findOne({ code: district });
    return data.path_with_type;
  }
  if (city) {
    const data = await City.findOne({ code: city });
    return data.name_with_type;
  }
};
