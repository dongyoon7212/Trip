import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import classes from "./SearchResult.module.css";
import LikeButton from "../UI/Button/LikeButton";

const SearchResult = ({ searchResults }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchExchangeRates = useCallback(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    setLoading(true);

    Promise.all(
      searchResults.map((result) => {
        return fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_API_KEY}/latest/${result.currencyAB}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.conversion_rates && data.conversion_rates.KRW) {
              return {
                currency: result.currencyAB,
                rate: data.conversion_rates.KRW,
              };
            }
            return null;
          })
          .catch((error) => {
            console.log(
              `Error fetching exchange rate for ${result.currencyAB}:`,
              error
            );
            return null;
          });
      })
    )
      .then((results) => {
        const exchangeRateData = {};
        results.forEach((result) => {
          if (result) {
            exchangeRateData[result.currency] = result.rate;
          }
        });
        setExchangeRates(exchangeRateData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching exchange rates:", error);
        setLoading(false);
      });
  }, [searchResults]);

  const fetchWeatherData = useCallback(() => {
    setLoading(true);

    Promise.all(
      searchResults.map((result) => {
        return axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${result.capitalAB}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
          )
          .then((response) => {
            const weather = response.data;
            return {
              capital: result.capitalAB,
              temperature: weather.main.temp,
              description: weather.weather[0].description,
              icon: weather.weather[0].icon,
            };
          })
          .catch((error) => {
            console.log(
              `Error fetching weather data for ${result.capitalAB}:`,
              error
            );
            return null;
          });
      })
    )
      .then((results) => {
        const weatherData = {};
        results.forEach((result) => {
          if (result) {
            weatherData[result.capital] = {
              temperature: result.temperature,
              description: result.description,
              icon: result.icon,
            };
          }
        });
        setWeatherData(weatherData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching weather data:", error);
        setLoading(false);
      });
  }, [searchResults]);

  useEffect(() => {
    fetchExchangeRates();
    fetchWeatherData();
  }, [fetchExchangeRates, fetchWeatherData]);

  useEffect(() => {
    if (
      Object.keys(weatherData).length > 0 &&
      Object.keys(weatherData)[0] !== "undefined"
    ) {
      console.log(weatherData[Object.keys(weatherData)[0]]);
    }
  }, [weatherData]);

  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return (
    <div className={classes.container}>
      {searchResults.map((result) => (
        <div key={result.id} className={classes.result}>
          <h3 className={classes.h3}>국가: {result.name}</h3>
          <LikeButton country={result} />
          <p className={classes.p}>수도: {result.capital}</p>
          <p className={classes.p}>언어: {result.language}</p>
          <p className={classes.p}>화폐: {result.currency}</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className={classes.p}>
              {exchangeRates[result.currencyAB]
                ? `환율 (${result.currencyAB}/KRW): ${exchangeRates[
                    result.currencyAB
                  ].toFixed(2)} KRW`
                : "Failed to fetch exchange rate."}
            </p>
          )}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {weatherData[result.capitalAB] &&
              weatherData[result.capitalAB].icon ? (
                <>
                  <p className={classes.p}>
                    온도: {weatherData[result.capitalAB].temperature.toFixed(1)}°C
                  </p>
                  <p className={classes.p}>
                    날씨: {weatherData[result.capitalAB].description}
                    <img
                      className={classes.weatherIcon}
                      src={`http://openweathermap.org/img/w/${weatherData[result.capitalAB].icon}.png`}
                      alt="Weather Icon"
                    />
                  </p>
                </>
              ) : (
                <p>Failed to fetch weather data.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
