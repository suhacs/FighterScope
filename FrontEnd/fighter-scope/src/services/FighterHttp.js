export const retrieveFighter = async () => {
  try {
    const fighterResponse = await fetch(
      'http://fighter-scope-data.onrender.com/fighter'
    );
    if (!fighterResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const fighterData = await fighterResponse.json();
    return fighterData;
  } catch (err) {
    console.error('Error occurred during fetching data:', err);
  }
};

export const createFighter = async (formData) => {
  try {
    const updatedFormData = {
      name: formData.name,
      nationality: formData.nationality,
    };

    const response = await fetch(
      'http://fighter-scope-data.onrender.com/fighter',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const createdFighter = await response.json();
    return createdFighter;
  } catch (error) {
    console.error('Error occurred during POST request:', error);
  }
};

export const deleteFighterById = async (id) => {
  try {
    const response = await fetch(
      `http://fighter-scope-data.onrender.com/fighter/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const deletedFighter = await response.json();
    console.log(deletedFighter);
    return deletedFighter;
  } catch (error) {
    console.error('Error occurred during DELETE request:', error);
  }
};

export const updateFighterById = async (id, fighter) => {
  try {
    const updatedFormData = {
      name: fighter.name,
      nationality: fighter.nationality,
    };

    const response = await fetch(
      `http://fighter-scope-data.onrender.com/fighter/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const updatedFighter = await response.json();
    return updatedFighter;
  } catch (error) {
    console.error('Error occurred during PUT request:', error);
  }
};
