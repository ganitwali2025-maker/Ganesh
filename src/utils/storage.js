
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving data', e);
  }
};

export const getData = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error getting data', e);
    return defaultValue;
  }
};

export const updateData = (key, newData) => {
  saveData(key, newData);
};

export const deleteData = (key) => {
  localStorage.removeItem(key);
};

export const clearData = () => {
  localStorage.clear();
};
