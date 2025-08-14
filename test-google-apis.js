// Direct API test to check what's going wrong
const API_KEY = 'AIzaSyDmiRrntmnWeqL_FsRJqd-rpNgOC0WFEzU';

console.log('Testing different Google APIs...');

// Test Places API (Autocomplete)
const testAutocomplete = async () => {
  const query = 'restaurant';
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('🔍 Autocomplete API Status:', data.status);
    console.log('🔍 Autocomplete Error:', data.error_message);
    return data;
  } catch (error) {
    console.error('🔍 Autocomplete Network Error:', error);
    return null;
  }
};

// Test Places API (Text Search)
const testTextSearch = async () => {
  const query = 'restaurant';
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('📍 Text Search API Status:', data.status);
    console.log('📍 Text Search Error:', data.error_message);
    return data;
  } catch (error) {
    console.error('📍 Text Search Network Error:', error);
    return null;
  }
};

// Test Places API (Place Details)
const testPlaceDetails = async () => {
  // Using a known place_id for testing
  const placeId = 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // Google Sydney office
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('🏢 Place Details API Status:', data.status);
    console.log('🏢 Place Details Error:', data.error_message);
    return data;
  } catch (error) {
    console.error('🏢 Place Details Network Error:', error);
    return null;
  }
};

// Run all tests
Promise.all([testAutocomplete(), testTextSearch(), testPlaceDetails()]).then(
  (results) => {
    console.log('=== API TEST RESULTS ===');
    results.forEach((result, index) => {
      const apis = ['Autocomplete', 'Text Search', 'Place Details'];
      if (result) {
        console.log(`${apis[index]}: ${result.status}`);
        if (result.error_message) {
          console.log(`  Error: ${result.error_message}`);
        }
      } else {
        console.log(`${apis[index]}: Network Error`);
      }
    });
  }
);
