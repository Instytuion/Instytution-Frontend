export const getDetailsByPincode = async (pincode, showToast) => {  
  console.log("Fetching details for pincode:", pincode);

  const apiKey = "pk.21d7780d13fbad6039ee8c3619464c76";

  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${pincode}&countrycodes=IN&format=json`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details from LocationIQ API:", errorData);
      console.log("Error 1");
      showToast("Please enter a valid pincode", "error", 4000);
    }

    const data = await response.json();
    console.log("Data received from LocationIQ API:", data);

    if (data.length === 0) {
      showToast("No results found... pls enter valid pincode", "error");
    }

    return data;
  } catch (error) {
    console.error("Error fetching location details:", error);
    // showToast(error, "error");
  }
};

// export const getDetailsByPincode = async (pincode) => {
//     const apiKey = '7905e37d2e1848dd980bae5fb3be6916';
//     try {
//         const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${apiKey}`);
//         const data = await response.json();
//         console.log(' data for location is :',data);

//         if (data.results.length === 0) throw new Error('No results found');
//         return data.results;
//     } catch (error) {
//         console.error("Error:", error);
//         throw error;
//     }
// };

// export const getDetailsByPincode = async (pincode) => {
//     try {
//         const response = await fetch(`https://api.zippopotam.us/IN/${pincode}`);
//         if (!response.ok) throw new Error('Pincode not found');
//         const data = await response.json();
//         console.log(' overall data is :',data);

//         // Extract city and state
//         const city = data.places[0]['place name'];
//         const state = data.places[0]['state'];
//         console.log('data city adn state is :',city, state);

//         return { city, state };
//     } catch (error) {
//         console.error("Error fetching location details:", error);
//         throw error;
//     }
// };

// export const getDetailsByPincode = async (pincode) => {
//     console.log('pincode is :',pincode);

//     const apiKey = '96737845f22af451ab8a651c76a36ae4';
//     try {

//         const response = await fetch(`http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${pincode}&country=IN`);
//         console.log('POstition stack is :',response);

//         const data = await response.json();

//         if (data.data.length === 0) throw new Error('No results found');

//         // Extract city and state
//         const { locality: city, region: state } = data.data[0];
//         return { city, state };
//     } catch (error) {
//         console.error("Error fetching location details:", error);
//         throw error;
//     }
// };

// export const getDetailsByPincode = async (pincode) => {
//     const apiKey = 'YOUR_MAPQUEST_API_KEY'; // Replace with your MapQuest API Key
//     try {
//         const response = await fetch(` https://www.mapquestapi.com/geocoding/v1/address?key=${pincode}`);
//         console.log(response);

//         const data = await response.json();

//         if (data.results[0].locations.length === 0) throw new Error('No results found');

//         // Extract city and state information from the response
//         const location = data.results[0].locations[0];
//         const city = location.adminArea5;
//         const state = location.adminArea3;

//         console.log('City:', city, 'State:', state); // Logs for debugging

//         return { city, state };
//     } catch (error) {
//         console.error("Error fetching location details:", error);
//         throw error;
//     }
// };
