console.log("this is getting called!!")

handleClick = () => {
  let place = document.querySelector("#searchTxt").value;
  // console.log(place);
  fetch("http://localhost:3000/weather?search=" + place).then((response) => {
    response.json().then((data) => {
      document
        .querySelector("#locationTxt").innerHTML="This is the weather in :  " + data[0].location;
        document.querySelector("#tempTxt").innerHTML =
          "Temperature is :  " + data[0].temparature + "degrees";
          document.querySelector("#corTxt").innerHTML =
            "Chance of rain :  " + data[0].rainchance + "%";
    });
  });  
};
