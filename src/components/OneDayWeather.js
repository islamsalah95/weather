import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Graphs from "./Graphs";

const OneDayWeather = ({ weather, loading, error }) => {
  var current_hour =
      weather &&
      weather.current.last_updated.toString(" ").split(" ")[1].split(":")[0];
  var wind_direction = weather && weather.current.wind_degree.toString();

  const [dryTemperature, setDryTemperature] = useState(null);
  const [seaLevelPressure, setSeaLevelPressure] = useState(null);
  const [WetBulb, setWetBulb] = useState(null);

  useEffect(() => {
    if (weather) {
      // setDryTemperature(weather.current.feelslike_c);
      setSeaLevelPressure(weather.current.pressure_mb);
      setWetBulb(weather.current.wB);
    }
  }, [weather]);

  const onDryTemperatureChange = (event) => {
    setDryTemperature(event.target.value);
  };

  const onSeaLevelPressureChange = (event) => {
    setSeaLevelPressure(event.target.value);
  };

  const onWetBulbChange = (event) => {
    setWetBulb(event.target.value);
  };

  let cityForElevation;

  function calculateWeatherValues(weather) {
    try {
      let height;
      cityForElevation = weather && weather.location.name;
      switch (cityForElevation) {
        case "Baghdad":
          height = 31.72;
          break;
        case "Samawah":
          height = 11.4;
          break;
        case "Al Kut":
          height = 19;
          break;
        case "Tekrit":
          height = 1075;
          break;
        case "An Nasiriya":
          height = 5;
          break;
        case "Kirkuk":
          height = 331;
          break;
        case "Arbil":
          height = 420;
          break;
        case "Sulaymaniyah":
          height = 843;
          break;
        case "Zakho":
          height = 433;
          break;
        case "Basra":
          height = 2.6;
          break;
        case "Dahuk":
          height = 276;
          break;
        case "`Amara":
          height = 9.5;
          break;
        case "Al Faw":
          height = 2.0;
          break;
        case "Najaf":
          height = 53;
          break;
        case "Babil":
          height = 27;
          break;
        case "Karbala":
          height = 29;
          break;
        case "Diwaniyah":
          height = 20;
          break;
        case "Ali Gharbi":
          height = 14;
          break;
        case "Mosul":
          height = 223;
          break;
        case "Al Busayyah":
          height = 11.4;
          break;
        case "Shamshamal":
          height = 701;
          break;

        default:
          break;
      }

      var Mheight;

      let pressure = seaLevelPressure;
      Mheight = height;

      let up_wb = WetBulb;

      function convertmbtoinHG(mb) {
        var inHG;
        inHG = 0.02953 * mb;
        return inHG;
      }

      let INpressure = parseFloat(convertmbtoinHG(pressure));
      var stnpressure;
      stnpressure =
          INpressure * Math.pow((288 - 0.0065 * Mheight) / 288, 5.2561);
      function convertinHGtomb(inHG) {
        var mb;
        mb = 33.8639 * inHG;
        return mb;
      }
      function roundOff1(value) {
        value = Math.round(100 * value) / 100;
        return value;
      }
      let result = roundOff1(
          parseFloat(convertinHGtomb(stnpressure)).toFixed(1)
      );

      var MBpressureRh, Ctemp;
      let temp = Number(dryTemperature);
      let pressure1 = result;
      let rh = weather && weather.current.humidity;
      MBpressureRh = pressure1;

      Ctemp = temp;

      if (rh > 100) {
        alert(
            "Your RH is greater than 100%.  RHs greater than 100% do not normally occur in the atmosphere.  This supersaturated script will now evaporate"
        );
      } else {
        rh = parseFloat(weather && weather.current.humidity);
      }

      var Es, E, dewpoint;
      function esubs(Ctemp) {
        var Es;
        Es = 6.112 * Math.exp((17.67 * Ctemp) / (Ctemp + 243.5));
        return Es;
      }
      function invertedRH(Es, rh) {
        var E;
        E = Es * (rh / 100);
        return E;
      }
      function Dewpoint(E) {
        var Dewpoint;
        Dewpoint =
            (243.5 * Math.log(E / 6.112)) / (17.67 - Math.log(E / 6.112));
        return Dewpoint;
      }
      function roundOff(value) {
        value = Math.round(100 * value) / 100;
        return value;
      }
      function calcwetbulb(
          Edifference,
          Twguess,
          Ctemp,
          MBpressure,
          E2,
          previoussign,
          incr
      ) {
        while (Math.abs(Edifference) > 0.005) {
          let Ewguess = 6.112 * Math.exp((17.67 * Twguess) / (Twguess + 243.5));
          let Eguess =
              Ewguess -
              MBpressure * (Ctemp - Twguess) * 0.00066 * (1 + 0.00115 * Twguess);
          Edifference = E2 - Eguess;

          if (Edifference === 0) {
            incr = 0;
          } else {
            if (Edifference < 0) {
              let cursign = -1;
              if (cursign !== previoussign) {
                previoussign = cursign;
                incr = incr / 10;
              } else {
              }
            } else {
              let cursign = 1;
              if (cursign !== previoussign) {
                previoussign = cursign;
                incr = incr / 10;
              } else {
              }
            }
          }

          Twguess = Twguess + incr * previoussign;
        }
        let wetbulb = Twguess - incr * previoussign;
        return wetbulb;
      }
      Es = parseFloat(esubs(Ctemp));
      E = parseFloat(invertedRH(Es, rh));
      dewpoint = Dewpoint(E);

      var dpc = roundOff(dewpoint);
      let E2 = parseFloat(invertedRH(Es, rh));
      let Twguess = 0;
      let incr = 10;
      let previoussign = 1;
      let Edifference = 1;

      let wetbulb = up_wb ? up_wb : calcwetbulb(
          Edifference,
          Twguess,
          Ctemp,
          MBpressureRh,
          E2,
          previoussign,
          incr
      ).toFixed(1);
      var wB = wetbulb;

      let pressure2 = result;
      var Mheight1, MBpressure;
      Mheight1 = height;
      MBpressure = pressure2;
      var altpressure, F1, F2, F3, F;

      F1 = (Math.pow(1013.25, 0.190284) * 0.0065) / 288;
      F2 = Mheight1 / Math.pow(MBpressure - 0.3, 0.190284);
      F3 = 1 / 0.190284;
      F = Math.pow(1 + F1 * F2, F3);
      altpressure = (MBpressure - 0.3) * F;
      function roundOff2(value) {
        value = Math.round(100 * value) / 100;
        return value;
      }
      let SeaLevel = roundOff2(altpressure);
      if (cityForElevation === "Baghdad") {
        SeaLevel = SeaLevel - 4.2;
      }

      const e = 6.112 * Math.exp((17.67 * dpc) / (dpc + 243.5));
      let virtualTemperatureC =
          parseFloat(dryTemperature) + 0.61 * dpc - 0.378 * e;
      virtualTemperatureC = virtualTemperatureC.toFixed(2);

      let actualVaporPressure1 =
          6.112 * Math.exp((17.67 * dpc) / (dpc + 243.5));

      let saturatedVaporPressure1 =
          6.112 *
          Math.exp(
              (17.67 * parseFloat(dryTemperature)) /
              (parseFloat(dryTemperature) + 243.5)
          );

      let actualVaporPressure = parseFloat(actualVaporPressure1.toFixed(2));
      let saturatedVaporPressure = parseFloat(
          saturatedVaporPressure1.toFixed(2)
      );

      let humitityRH = (actualVaporPressure1 / saturatedVaporPressure1) * 100;
      humitityRH = Math.round(humitityRH);

      let saturatedMixingRatio =
          (0.622 * saturatedVaporPressure) / (result - saturatedVaporPressure);

      saturatedMixingRatio = parseFloat(saturatedMixingRatio.toFixed(2));

      if(Number(wB) === Number(temp) || Math.abs(parseInt(wB) - parseInt(temp)) < 1) {
        humitityRH = 100;
      }

      return {
        height,
        result,
        dpc,
        wB,
        SeaLevel,
        virtualTemperatureC,
        actualVaporPressure,
        saturatedVaporPressure,
        saturatedMixingRatio,
        humitityRH,
      };
    } catch (error) {
      console.log("error in calculations", error);
    }
  }

  function Computevprh(ttt, wb) {
    var a = 6.105,
        b = 17.27,
        c = 237.3,
        SVP = 0,
        SVP2 = 0;

    wb = parseFloat(wb);
    ttt = parseFloat(ttt);

    let r = Math.round((Math.abs(ttt) - Math.abs(wb)) / 100, 1) + 0.1;

    SVP = a * Math.pow(10, (7.5 * wb) / (c + wb));

    SVP2 = a * Math.pow(10, (7.5 * ttt) / (c + ttt));


    let c3 = Math.round(wb / 1000, 3),
        g = 0.800;

    if (wb > 15 && wb <= 55) {
      g = g - c3;
    }
    g = g * (1 + 0.00115 * wb);

    let vppp = SVP - g * (ttt - wb) - r;
    let rhhh = (Math.abs(vppp) / SVP2) * 100 - r;

    let tdtdtd =
        (c * (Math.log(rhhh / 100) + (b * ttt) / (parseInt(c) + ttt))) /
        (b - (Math.log(rhhh / 100) + (b * ttt) / (parseInt(c) + ttt))) -
        r +
        0.1;

    if(wb == ttt || Math.abs(parseInt(wb) - parseInt(ttt)) < 1) {
      vppp = 100;
    }

    vppp = vppp.toFixed(1);
    rhhh = wb.toFixed(2) === ttt.toFixed(2) ? 100 : (rhhh+1).toFixed(0);
    tdtdtd = wb.toFixed(2) === ttt.toFixed(2) ? ttt : tdtdtd.toFixed(1);

    return {
      vppp,
      rhhh,
      tdtdtd,
    };

  }

  const weatherValues =
      !loading && !error && weather ? calculateWeatherValues(weather) : {};
  const weatherValuess =
      !loading && !error && weather && weatherValues
          ? Computevprh(dryTemperature, weatherValues.wB)
          : {};

  return (
      <div className="container my-5">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
            <>
              <div className="mt-3 row d-flex justify-content-center flex-nowrap">
                <div className="col mb-2 bg-light me-1 d-flex justify-content-start align-items-start flex-column shadow-sm rounded-3 p-3"
                     style={{
                       height: "fit-content",
                       position: "sticky",
                       top: "5%"
                }}>
                  <span className="h6 fw-bolder text-black">Country: {weather && weather.location.country}</span>
                  <span className="h6 fw-bolder text-black">City: {weather && weather.location.name}</span>
                  <span className="h6 fw-bolder text-black">Date: {format(
                      new Date(weather && weather.current.last_updated),
                      "EEEE, d MMMM yyyy"
                  )}</span>
                  <div className="w-100 border-bottom border-1 mb-3"></div>
                  <div className="d-flex flex-column justify-content-start align-items-start w-100">
                    <div className="form-floating mb-3 me-2 w-100">
                      <input type="text" className="form-control" id="sea-level-pressure" value={seaLevelPressure} onChange={onSeaLevelPressureChange}/>
                      <label htmlFor="sea-level-pressure">Sea Level Pressure</label>
                    </div>
                    <div className="form-floating mb-3 me-2 w-100">
                      <input type="text" className="form-control" id="dry-temprature" value={dryTemperature} onChange={onDryTemperatureChange}/>
                      <label htmlFor="dry-temprature">Dry Temperature</label>
                    </div>
                    <div className="form-floating mb-3 w-100">
                      <input  className="form-control" id="wet-bulb" type="text" value={weatherValues.wB} onChange={onWetBulbChange} />
                      <label htmlFor="wet-bulb">Wet Bulb</label>
                    </div>
                  </div>
                  <div className="w-100 border-bottom border-1 mb-3"></div>
                  <span className="h6 fw-bolder text-dark">
                    Wind Direction: {Math.round(wind_direction / 10) * 10}
                  </span>
                  <span className="h6 fw-bolder text-dark">
                    Wind Speed: {
                    Math.round(
                        Math.round(weather && weather.current.wind_mph) / 2
                    ) < 10
                        ? `0${Math.round(
                            Math.round(weather && weather.current.wind_mph) / 2
                        ) + "m/sec"
                        }`
                        : `${Math.round(
                            Math.round(weather && weather.current.wind_mph) / 2
                        )} m/sec`
                  }
                  </span>
                  <span className="h6 text-dark fw-bolder">
                      Wind Gust: {
                      weather &&
                      weather.forecast.forecastday[0].hour.map((data) =>
                          data.time.toString().split(" ")[1].split(":")[0] ===
                          current_hour ? (
                              Math.round(weather && weather.current.gust_kph / 2) + " KT"
                          ) : (
                              ""
                          )
                      )
                  }
                  </span>
                  <span className="h6 fw-bolder text-dark">
                    Wind Chill: {weather &&
                      weather.forecast.forecastday[0].hour.map((data) =>
                          data.time.toString().split(" ")[1].split(":")[0] ===
                          current_hour ? (
                              data.windchill_c + "°"
                          ) : (
                              ""
                          )
                      )}
                  </span>
                  <div className="w-100 border-bottom border-1 mb-3"></div>
                  <span className="h6 fw-bolder text-dark">Visibility: {
                      weather && weather.current.vis_km + " KM"
                  }</span>
                  <span className="h6 fw-bolder text-danger">Dew Point: {
                      weatherValuess.tdtdtd + " °"
                  }</span>
                  <span className="h6 fw-bolder text-danger">Humidity: {
                      weatherValuess.rhhh + "%"
                  }</span>
                  <span className="h6 fw-bolder text-danger">Actual Vapor Pressure: {
                    weatherValuess.vppp
                  }</span>
                  <span className="h6 fw-bolder text-dark">Virtual Temprature: {
                      weatherValues.virtualTemperatureC + " C°"
                  }</span>
                  <div className="w-100 border-bottom border-1 mb-3"></div>
                  {/*<span className="h6 fw-bolder text-dark">Station Pressure: {*/}
                  {/*  weatherValues.result*/}
                  {/*}</span>*/}
                  <span className="h6 fw-bolder text-dark">Saturated Vapor Pressure: {
                    weatherValues.saturatedVaporPressure
                  }</span>
                  <span className="h6 fw-bolder text-dark">Saturated Mixing Ratio: {
                    weatherValues.saturatedMixingRatio
                  }</span>
                </div>
                <div className="col mb-2 bg-light me-1 d-flex justify-content-start align-items-start flex-column shadow-sm rounded-3 p-3">
                  <Graphs/>
                </div>
              </div>
            </>
        )}
      </div>
  );
};

export default OneDayWeather;