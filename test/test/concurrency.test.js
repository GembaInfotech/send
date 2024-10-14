const axios = require('axios');

describe('Concurrency Test for Booking API', function () {
  this.timeout(100000); // Set a timeout for the test

  it('should handle concurrent booking requests', async function () {
    const url = 'http://localhost:4005/booking/create-new-booking'; // Replace with your actual API endpoint
    const bookingData = {
      // Add your booking data here
      cgst: 4,
      inTime: "2024-10-15T02:04",
      outTime: "2024-10-15T03:04",
      parking: "6694af207904728f833889ab",
      parkingCode: "P000000018",
      parkingName: "INDIA GATE",
      price: 40,
      sgst: 4,
      totalPrice: 48,
      transaction_id: "pay_P85ciObi5SzcfL",
      vehicle_id: "670a2d72fe458f1f78b64092",
      vehicle_name: "SFS34234",
      vehicle_number: "34324",
      vehicle_type: "two wheeler"
    };
    const numCalls = 20 // Number of concurrent calls
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2RjMjdiNzQyNDI4ZTM3MDNhNmZiYyIsImVtYWlsIjoiamFpbmdhcmltYTE3OTVAZ21haWwuY29tIiwicHJvZmlsZSI6IjE3Mjg2NjI4NzUxNDItNTg4Mjg1MjMzLmpwZyIsImlhdCI6MTcyODcyODk5OCwiZXhwIjoxNzI5MzMzNzk4fQ.XolAEV1KlZqFL_dk3bXjxmFfCAPLAYbQRTERjK5oMLs"

    const requests = Array.from({ length: numCalls }, () => axios.post(url, bookingData, { headers: { Authorization: `Bearer ${token}` } }));

    let successCount = 0; // Counter for successful responses
    let failureCount = 0; // Counter for failed responses
    
    try {
      const responses = await Promise.all(requests);
      responses.forEach(response => {
        // Check for expected response status
        if (response.status === 201) {
          successCount++;
          console.log('Success:', response.data); // Log successful responses
        } else if(response.status==200) {
          failureCount++;
          console.log(`Failed: Expected status 201 but got ${response.status}`);
        }
      });
    } catch (error) {
      console.log(`API call failed: ${error.message}`);
      failureCount++;
    }
    finally {
      console.log(`Total Successful Requests: ${successCount}`);
      console.log(`Total Failed Requests: ${failureCount}`);
    }
  });
});
