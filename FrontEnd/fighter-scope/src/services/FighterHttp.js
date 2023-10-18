export const retrieveFighter = async () => {
  try {
    const fighterResponse = await fetch('http://localhost:8080/fighter');
    if (!fighterResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const fighterData = await fighterResponse.json();
    return fighterData;
  } catch (err) {
    console.error('Error occurred during fetching data:', err);
  }
};
