import React from "react";
import { ToastContainer, toast } from "react-toastify";

import DefaultCapitals from "./components/DefaultCapitals";
import SearchBar from "./components/SearchBar";
import { TimeAndLocation } from "./components/TimeAndLocation";
import { Details } from "./components/Details";
import { Forecast } from "./components/Forecast";
import { getFotmattedWeatherData } from "./services/weather.service";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = React.useState({ q: "berlin" });
  const [units, setUnits] = React.useState("metric");
  const [weather, setWeather] = React.useState(null);

  React.useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";

      toast.info("Fetching weather for " + message);
      getFotmattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          "Succesfully fetch data for: ",
          `${data.city}: ${data.country}`
        );
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground} h-fit shadow-xl shadow-gray-400`}
    >
      <DefaultCapitals setQuery={setQuery} />
      <SearchBar setQuery={setQuery} setUnits={setUnits} units={units} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <Details weather={weather} />
          <Forecast items={weather.hourly} title="hourly forecast" />
          <Forecast items={weather.dayly} title="dayly forecast" />
        </div>
      )}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
