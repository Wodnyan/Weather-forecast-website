window.addEventListener("load", () => {
  let long;
  let lat;
  
  let timezone = document.querySelector(".timezone");
  let degree = document.querySelector(".temperature");
  let description = document.querySelector(".description");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      proxy = `https://cors-anywhere.herokuapp.com/`;
      api = `${proxy}https://api.darksky.net/forecast/ef376d6c71675eeb5c26ebcdbfd4b063/${lat},${long}`;

      fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data => {
          console.log(data);
          
          const {temperature, summary, icon} = data.currently;
          timezone.textContent = data.timezone;
          degree.textContent = temperature.toFixed(0);
          description.textContent = summary;
          setIcons(icon, document.querySelector(".icon"));

          const celsius = (temperature - 32) * 5/9;
          console.log(celsius.toFixed(0));

          degree.addEventListener('click', ()=>{
            if(document.querySelector("span").textContent === "F"){
              document.querySelector("span").textContent = "C";
              document.querySelector(".temperature").textContent = celsius.toFixed(0);
            }
            else{
              document.querySelector("span").textContent = "F";
              document.querySelector(".temperature").textContent = temperature.toFixed(0);
            }
          })

          
        });
    });
  }
  function setIcons(icon, iconID){
    const skycons = new Skycons({"color": "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);
  }
});
