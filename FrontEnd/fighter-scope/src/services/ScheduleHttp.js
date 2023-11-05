export const retrieveSchedule = async () => {
  const mapFightersToNames = (scheduleData, fighterData) => {
    return scheduleData.map((item) => {
      const firstFighter = fighterData.find(
        (fighter) => fighter.id === item.fighter_1
      );
      const secondFighter = fighterData.find(
        (fighter) => fighter.id === item.fighter_2
      );

      return {
        date: new Date(
          item.date.toLocaleString('en-US', { timeZone: 'America/New_York' })
        ),
        firstFighter: firstFighter ? firstFighter.name : '',
        secondFighter: secondFighter ? secondFighter.name : '',
        place: item.place,
        id: item.id,
      };
    });
  };

  try {
    const scheduleResponse = await fetch('http://localhost:8080/schedule');
    const fighterResponse = await fetch('http://localhost:8080/fighter');

    if (!scheduleResponse.ok || !fighterResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const scheduleArr = await scheduleResponse.json();
    const fighterArr = await fighterResponse.json();
    const scheduleData = await mapFightersToNames(scheduleArr, fighterArr);

    return scheduleData;
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

    const createdSchedule = await response.json();
    return createdSchedule;
  } catch (error) {
    console.error('Error occurred during POST request:', error);
  }
};

export const deleteScheduleById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/schedule/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const deletedSchedule = await response.json();
    console.log(deletedSchedule);
    return deletedSchedule;
  } catch (error) {
    console.error('Error occurred during DELETE request:', error);
  }
};

export const updateScheduleById = async (id, schedule) => {
  try {
    const fighter1Response = await fetch(
      `http://localhost:8080/fighter/${schedule.fighter_1}`
    );
    const firstFigther = await fighter1Response.json();

    const fighter2Response = await fetch(
      `http://localhost:8080/fighter/${schedule.fighter_2}`
    );
    const secondFighter = await fighter2Response.json();

    console.log(firstFigther[0].id);
    console.log(secondFighter[0].id);

    if (!fighter1Response.ok || !fighter2Response.ok) {
      throw new Error('One or both fighters do not exist in the database');
    }

    const updatedFormData = {
      date: schedule.date,
      place: schedule.place,
      fighter_1: firstFigther[0].id,
      fighter_2: secondFighter[0].id,
    };

    console.log(updatedFormData);

    const response = await fetch(`http://localhost:8080/schedule/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const updatedSchedule = await response.json();
    return updatedSchedule;
  } catch (error) {
    console.error('Error occurred during PUT request:', error);
  }
};
