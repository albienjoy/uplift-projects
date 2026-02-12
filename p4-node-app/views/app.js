// registration form
const registrationName = document.querySelector("#name");
const registrationUsername = document.querySelector("#username");
const registratioEmail = document.querySelector("#email");
const registrationPassword = document.querySelector("#password");
const registrationContact = document.querySelector("#contactNum");

//donation form 
const donationItem = document.querySelector("#item");
const donationType = document.querySelector("#item-type");
const donationQuantity = document.querySelector("#item-quantity");

//addres form
const houseNum = document.querySelector("#house-number");
const street = document.querySelector("#street");
const barangay = document.querySelector("#barangay");
const city = document.querySelector("#city");
const province = document.querySelector("#province");
const zipCode = document.querySelector("#zip-code");

//general form status msg
const submissionStatusMessage = document.querySelector("#submission-status-msg");

//login form
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");

//hyperlink anchors
const loginAnchor = document.querySelector("#login-anchor")
const registerAnchor = document.querySelector("#registration-anchor");
const logoutAnchor = document.querySelector("#logout-anchor");
const homeAnchor = document.querySelector("#home-anchor");

//list part
const listContainer = document.querySelector("#list-container");
//manipoulat this so all listed items appear

//button anchors dashboard
const donationAnchor = document.querySelector("#donate-btn-anchor");
const listAnchor = document.querySelector("#list-btn-anchor");
const userDetailsAnchor = document.querySelector("#user-details-btn-anchor");

//donation overlay bts
const donateAgainBtn = document.querySelector("#donate-again-btn");
const returnBtn = document.querySelector("#return-btn");

//section declarations
const homeSection = document.querySelector("#home-section");
const dashboardSection = document.querySelector("#dashboard-section");
const loginSection = document.querySelector("#login-section");
const registrationSection = document.querySelector("#registration-section");
const donationSection = document.querySelector("#donation-section");
const listSection = document.querySelector("#list-section");
const logoutSection = document.querySelector("#logout-section");
const userSection = document.querySelector("#user-section");

// buttons
const registrationBtn = document.querySelector("#registration-btn");
const loginBtn = document.querySelector("#login-btn");
const userDetailsBtn = document.querySelector("#user-details-btn"); //use to go to user section
const addressBtn = document.querySelector("#address-btn"); //use to go to user section
const donateBtn = document.querySelector("#donate-btn");
const updateBtn = document.querySelector("#update-btn");
const deleteBtn = document.querySelector("#delete-btn");

const usernameHeader = document.querySelector("#username-container");

homeSection.classList.remove("hidden");

//ENDPOINTS
const registerEndpoint = "http://localhost:5555/api/register";
const loginEndpoint = "http://localhost:5555/api/login";
const logoutEndpoint = "http://localhost:5555/api/logout";
const donationEndpoint = "http://localhost:5555/api/donation";
const addressEndpoint = "http://localhost:5555/api/address";
const listDonationEndpoint = "http://localhost:5555/api/donation";


let isLoggedIn = false;

const navigate = (sectionId) => {
  // hide all sections
  document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden");
  });

  // unhide the target section
  const target = sectionId;
  if (target) {
    target.classList.remove("hidden");
  }
};

const remainInSection = (sectionId) => {
    document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden");
  });

  // unhide the target section
  const target = sectionId;
  if (target) {
    target.classList.remove("hidden");
  };
};

//link event listeners
homeAnchor.addEventListener("click", () => {
  navigate(homeSection)
});

//homepage to lgoin
loginAnchor.addEventListener("click", () => {
  navigate(loginSection);
});

registerAnchor.addEventListener("click", () => {
  navigate(registrationSection);
});

logoutAnchor.addEventListener("click", async () => {
  try {
    const response = await fetch(logoutEndpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("Success:");

    if (response.ok) {
      window.location.hash = '#logout-section';
    };

  }catch(error) {
    console.error("POST error:", error);
  }
});

donationAnchor.addEventListener("click", () => {
  navigate(donationSection);
});

listAnchor.addEventListener("click", () => {
  navigate(listSection);
});

userDetailsAnchor.addEventListener("click", () => {
  navigate(userSection);
});

//functions
const registerUser = async (data) => {
  try {
    const response = await fetch(registerEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Success:", responseData);
    // return responseData; //DO I NEED TO RETURN THIS DATA?
    navigate(dashboardSection);


  } catch (error) {
    console.error("POST error:", error);
  }
};

const loginUser = async (data) => {
  try{
      const response = await fetch(loginEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    };

    const responseData = await response.json();
    console.log("Success:", responseData);
    navigate(dashboardSection);


    // return responseData; //TEST - what if di ko ilagay

  }catch (error) {
    console.error("POST error:", error);
  };
};

const postData = async (url, data, sectionId) => {
    try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      submissionStatusMessage.innerHTML = "Oops! Please try again."
           throw new Error(`HTTP error! Status: ${response.status}`);
    };

    const responseData = await response.json();
    console.log("Success:", responseData);
    // return responseData; //DO I NEED TO RETURN THIS DATA?
    if (!responseData) {
      submissionStatusMessage.innerHTML = "Oops! Please try again."
           throw new Error(`HTTP error! Status: ${response.status}`);
    };
    
  } catch (error) {
    console.error("POST error:", error);
  }
};


//button event listeners
registrationBtn.addEventListener("click", () => {
    try {
  const newData = {
    name: registrationName.value,
    username: registrationUsername.value,
    email: registratioEmail.value,
    password: registrationPassword.value,
    contactNum: registrationContact.value,
  };

  postData(registerEndpoint, newData);
  navigate(dashboardSection);
//    window.location.hash = '#dashboard-section';

    }catch(err){
        submissionStatusMessage.innerHTML = "Error registering. Please try again."
        remainInSection(registrationSection)
    };
});

loginBtn.addEventListener("click", () => {
try {
    const loginData = {
      username: loginUsername.value,
      password: loginPassword.value,
    };

    loginUser(loginData);
    navigate(dashboardSection);
  } catch(err){
  console.log("error", err);
    };
});

// donateBtn.addEventListener("click", (event)=>{
//   try {
//     event.preventDefault();

//     const newDonation = {
//       item: donationItem.value,
//       type: donationType.value,
//       quantity: donationQuantity.value
//     };

//     postData(donationEndpoint, newDonation);
//     window.location.hash = "#dashboard-section"
//   } catch(err){
//   console.log("error", err);
//     }
// });


addressBtn.addEventListener ("click", (event) => {
  try {
    event.preventDefault();

    const newAddress = {
      houseNum: houseNum.value,
      street: street.value,
      barangay: barangay.value,
      city: city.value,
      province: province.value,
      zipCode: zipCode.value
    };

    postData(addressEndpoint, newAddress);
    submissionStatusMessage.innerHTML = "Address successfully updated!"

  } catch(err){
  console.log("error", err);
    }; 
});

listAnchor.addEventListener("click", async () => {
navigate(listSection);

try {
const response = await fetch(listDonationEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
    };

    const donations = await response.json();
    console.log("Success:", donations);

    if (!donations) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    };
    
    donations.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item.item} - ${item.type} - ${item.quantity}`;
            console.log(listItem);
            listContainer.appendChild(listItem);
        });

}catch(err){
  console.log("error", err);
    }; 
});