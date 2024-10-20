const clearSearchBtn = document.getElementById("resetSeatch");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
      patients.push({ name, gender: gender.value, age, condition });
      resetForm();
      generateReport();
    }
  }

  function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }

  function clearSearch() {
    document.getElementById("conditionInput").value = "";
  }

  function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const index = Math.floor(Math.random() * (2 - 0) + 0);
        console.log('index', input.toLowerCase().includes('countr'));
        console.log(data.countries[index]);
        if(input.toLowerCase().includes('countr')){
            data.countries[index].cities.forEach((city) => {
                resultDiv.innerHTML += `<div class="card2">
                <img src=${city.imageUrl} alt="Avatar" style="width:100%">
                <div class="container2">
                  <h4><b>${city.name}</b></h4> 
                  <p>${city.description}</p>
                  <button>Visit</button>
                </div>
              </div>`;
            })
        }
        else if(input.toLowerCase().includes('temple')){
            data.temples.forEach((temple) => {
                resultDiv.innerHTML += `<div class="card2">
                <img src=${temple.imageUrl} alt="Avatar" style="width:100%">
                <div class="container2">
                  <h4><b>${temple.name}</b></h4> 
                  <p>${temple.description}</p> 
                  <button>Visit</button>
                </div>
              </div>`;
            })
        }
        else if(input.toLowerCase().includes('beach')){
            data.beaches.forEach((beach) => {
                resultDiv.innerHTML += `<div class="card2">
                <img src=${beach.imageUrl} alt="Avatar" style="width:100%">
                <div class="container2">
                  <h4><b>${beach.name}</b></h4> 
                  <p>${beach.description}</p> 
                  <button>Visit</button>
                </div>
              </div>`;
            })
        }
        else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchCondition);

  function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
      Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
      Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
    };

    for (const patient of patients) {
      conditionsCount[patient.condition]++;
      genderConditionsCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
      report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
      report.innerHTML += `${gender}:<br>`;
      for (const condition in genderConditionsCount[gender]) {
        report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
      }
    }
  }

  function fetchData() {
    
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
 

clearSearchBtn.addEventListener("click", clearSearch);
fetchData();