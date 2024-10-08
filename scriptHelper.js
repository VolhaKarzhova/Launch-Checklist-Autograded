// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
    // Here is the HTML formatting for our mission target div.
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
       <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter:  ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
             <img src="${image}">`;
};

function validateInput(testInput) {
    if (testInput === '') {
        return "Empty";
    }
    if (isNaN(testInput)) {
        return "Not a Number";
    }
    if (!isNaN(testInput)) {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    setDefaultFaultyItems(document);
    const fields = [pilot, copilot, fuelLevel, cargoLevel];
    const emptyFieldsCount = getNumberOfEmptyFileds(fields);
    if (emptyFieldsCount > 0) {
        alert(`Oops! Empty fields are not allowed. Data is missing in ${emptyFieldsCount} field(s)`);
        return;
    };
    if (validateInput(fuelLevel) === "Not a Number") {
        alert(`Only numeric values can be entered in Fuel Level field`);
        return;
    };
    if (validateInput(cargoLevel) === "Not a Number") {
        alert(`Only numeric values can be entered in Cargo Mass field`);
        return;
    };

    document.getElementById("faultyItems").style.visibility = "visible";
    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;

    const launchStatus = document.getElementById("launchStatus");
    const fuelStatus = document.getElementById("fuelStatus");
    const cargoStatus = document.getElementById("cargoStatus");

    const isFuelEnough = fuelLevel >= 10000;
    const isCargoMassAllowed = cargoLevel <= 10000;
    const isShuttleReadyToLauch = isFuelEnough && isCargoMassAllowed;

    assignLaunchStatus(launchStatus, isShuttleReadyToLauch);
    assignFuelStatus(fuelStatus, isFuelEnough);
    assignCargoStatus(cargoStatus, isCargoMassAllowed);
}

function assignLaunchStatus(launchStatus, isReadyToLaunch) {
    let status = "Shuttle Not Ready for Launch";
    let statusColor = "red";
    if (isReadyToLaunch) {
        status = "Shuttle is Ready for Launch"
        statusColor = "green";
    }
    launchStatus.innerHTML = status;
    launchStatus.style.color = statusColor;
}

function assignFuelStatus(fuelStatus, isFuelEnough) {
    let status = "Fuel level too low for launch";
    if (isFuelEnough) {
        status = "Fuel level high enough for launch";
    }
    fuelStatus.innerHTML = status;
}

function assignCargoStatus(cargoStatus, isCargoMassAllowed) {
    let status = "Cargo mass too heavy for launch";
    if (isCargoMassAllowed) {
        status = "Cargo mass low enough for launch";
    }
    cargoStatus.innerHTML = status;
}

function getNumberOfEmptyFileds(fields){
    let emptyFields = [];
    for (let index = 0; index < fields.length; index++) {
        if (validateInput(fields[index]) === "Empty") {
            emptyFields.push(fields[index]);
        };
    };
    return emptyFields.length;
}

function setDefaultFaultyItems(document) {
    document.getElementById("faultyItems").style.visibility = "hidden";
    document.getElementById("launchStatus").innerHTML = "Awaiting Information Before Launch";
    document.getElementById("launchStatus").style.color = "black";
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random() * planets.length);
    return planets[planetIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;