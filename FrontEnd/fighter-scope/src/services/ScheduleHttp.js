const mapFightersToNames = (scheduleData, fighterData) => {
  return scheduleData.map((item) => ({
    date: new Date(item.date),
    firstFighter: fighterData.find((fighter) => fighter.id === item.fighter_1)
      .name,
    secondFighter: fighterData.find((fighter) => fighter.id === item.fighter_2)
      .name,
    place: item.place,
  }));
};

export const retrieveSchedule = async () => {
  try {
    const scheduleResponse = await fetch('http://localhost:8080/schedule');
    const fighterResponse = await fetch('http://localhost:8080/fighter');

    console.log(scheduleResponse);
    if (!scheduleResponse.ok || !fighterResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const scheduleData = await scheduleResponse.json();
    const fighterData = await fighterResponse.json();

    const scheduleArray = mapFightersToNames(scheduleData, fighterData);

    scheduleArray.forEach((item) => {
      item.date = new Date(
        item.date.toLocaleString('en-US', { timeZone: 'America/New_York' })
      );
    });

    return scheduleArray;
  } catch (err) {
    console.error('Error occurred during fetching data:', err);
  }
};

export const createSchedule = async (formData) => {
  try {
    const fighter1Response = await fetch(
      `http://localhost:8080/fighter/${formData.fighter_1}`
    );
    const firstFigtherId = await fighter1Response.json();

    const fighter2Response = await fetch(
      `http://localhost:8080/fighter/${formData.fighter_2}`
    );
    const secondFighterId = await fighter2Response.json();

    if (!fighter1Response.ok || !fighter2Response.ok) {
      throw new Error('One or both fighters do not exist in the database');
    }

    const updatedFormData = {
      date: formData.date,
      place: formData.place,
      fighter_1: firstFigtherId[0].id,
      fighter_2: secondFighterId[0].id,
    };

    const response = await fetch('http://localhost:8080/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error occurred during POST request:', error);
  }
};
export default retrieveSchedule;
