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

const retrieveSchedule = async () => {
  try {
    const scheduleResponse = await fetch('http://localhost:8080/schedule');
    const fighterResponse = await fetch('http://localhost:8080/fighter');

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

export default retrieveSchedule;
