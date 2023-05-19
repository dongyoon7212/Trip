import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

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
          `https://v6.exchangerate-api.com/v6/a513c4773be605c914469479/latest/${result.currencyAB}`,
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
            weatherData[result.capitalAB] = {
              temperature: result.temperature,
              description: result.description,
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

  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return (
    <div>
      {searchResults.map((result) => (
        <ul key={result.id}>
          <li>국가이름: {result.name}</li>
          <li>수도: {result.capital}</li>
          <li>언어: {result.language}</li>
          <li>화폐: {result.currencyAB}</li>
          {loading ? (
            <li>Loading...</li>
          ) : (
            <li>
              {exchangeRates[result.currencyAB]
                ? `환율(${result.currencyAB}/KRW): ${exchangeRates[
                    result.currencyAB
                  ].toFixed(2)}`
                : "환율 정보를 가져오지 못했습니다."}
            </li>
          )}
          {loading ? (
            <li>Loading...</li>
          ) : (
            <li>
              {weatherData[result.capitalAB]
                ? `온도: ${weatherData[result.capitalAB].temperature.toFixed(
                    1
                  )}°C, 날씨: ${weatherData[result.capitalAB].description}`
                : "날씨 정보를 가져오지 못했습니다."}
            </li>
          )}
        </ul>
      ))}
    </div>
  );
};

export default SearchResult;
