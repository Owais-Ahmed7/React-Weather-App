const express = require("express");
const router = express.Router();
const { get } = require("axios");

let cityName = "london";
let countryName = "uk";
router.route("/").post((req, res) => { 
    try {
        countryName = req.body.countryName;
        cityName = req.body.cityName;
        console.log(countryName,cityName);
    } catch(error) {
        console.log("error in post request items",error)
    }
    get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(response => {
        return response.data;
    })
       .then(data => {
           res.send(data);
       })
       .catch(err => {
        //    console.log("json data error ", err)
       })
    .catch(err => console.log("Error in post methode" + err)) 
})

router.route("/currentweather").get((req, res) => {
    console.log(cityName, countryName);
    get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(response => {
            return response.data;
        })
           .then(data => {
               res.setHeader("Access-Control-Allow-Origin", "*");
               res.send(data);
               console.log("get route request weather data",data);
           })
           .catch(err => {
               console.log("data json error in get route", err)
           })  
        .catch(err => console.log("Error in get methode" + err)) 
})

module.exports = router;

// router.route("/currentweather/:cityName").get((req, res) => {
//     const cityName = req.params.cityName
// })

// {
//     return {
//      cityName : response.data.name,
//      desc : response.data.weather[0].description,
//      icon: response.data.weather[0].icon,
//      temp: response.data.main.temp,
//      humidity: response.data.main.humidity,
//      visibility: response.Data.visibility,
//  }
// }


// "{
//     status: 200,
//     statusText: 'OK',
//     headers: {
//       server: 'openresty',
//       date: 'Tue, 07 Dec 2021 13:29:59 GMT',
//       'content-type': 'application/json; charset=utf-8',
//       'content-length': '479',
//       connection: 'close',
//       'x-cache-key': '/data/2.5/weather?q=pakistan,islamabad&units=metric',
//       'access-control-allow-origin': '*',
//       'access-control-allow-credentials': 'true',
//       'access-control-allow-methods': 'GET, POST'
//     },
//     config: {
//       transitional: {
//         silentJSONParsing: true,
//         forcedJSONParsing: true,
//         clarifyTimeoutError: false
//       },
//       adapter: [Function: httpAdapter],
//       transformRequest: [ [Function: transformRequest] ],
//       transformResponse: [ [Function: transformResponse] ],
//       timeout: 0,
//       xsrfCookieName: 'XSRF-TOKEN',
//       xsrfHeaderName: 'X-XSRF-TOKEN',
//       maxContentLength: -1,
//       maxBodyLength: -1,
//       validateStatus: [Function: validateStatus],
//       headers: {
//         Accept: 'application/json, text/plain, */*',
//         'User-Agent': 'axios/0.24.0'
//       },
//       method: 'get',
//       url: 'https://api.openweathermap.org/data/2.5/weather?q=pakistan,islamabad&units=metric&appid=ee3fad6d47e37433c3589c0eddedf354',
//       data: undefined
//     },
//     request: <ref *1> ClientRequest {
//       _events: [Object: null prototype] {
//         abort: [Function (anonymous)],
//         aborted: [Function (anonymous)],
//         connect: [Function (anonymous)],
//         error: [Function (anonymous)],
//         socket: [Function (anonymous)],
//         timeout: [Function (anonymous)],
//         prefinish: [Function: requestOnPrefinish]
//       },
//       _eventsCount: 7,
//       _maxListeners: undefined,
//       outputData: [],
//       outputSize: 0,
//       writable: true,
//       destroyed: false,
//       _last: true,
//       chunkedEncoding: false,
//       shouldKeepAlive: false,
//       _defaultKeepAlive: true,
//       useChunkedEncodingByDefault: false,
//       sendDate: false,
//       _removedConnection: false,
//       _removedContLen: false,
//       _removedTE: false,
//       _contentLength: 0,
//       _hasBody: true,
//       _trailer: '',
//       finished: true,
//       _headerSent: true,
//       socket: TLSSocket {
//         _tlsOptions: [Object],
//         _secureEstablished: true,
//         _securePending: false,
//         _newSessionPending: false,
//         _controlReleased: true,
//         secureConnecting: false,
//         _SNICallback: null,
//         servername: 'api.openweathermap.org',
//         alpnProtocol: false,
//         authorized: true,
//         authorizationError: null,
//         encrypted: true,
//         _events: [Object: null prototype],
//         _eventsCount: 10,
//         connecting: false,
//         _hadError: false,
//         _parent: null,
//         _host: 'api.openweathermap.org',
//         _readableState: [ReadableState],
//         _maxListeners: undefined,
//         _writableState: [WritableState],
//         allowHalfOpen: false,
//         _sockname: null,
//         _pendingData: null,
//         _pendingEncoding: '',
//         server: undefined,
//         _server: null,
//         ssl: [TLSWrap],
//         _requestCert: true,
//         _rejectUnauthorized: true,
//         parser: null,
//         _httpMessage: [Circular *1],
//         [Symbol(res)]: [TLSWrap],
//         [Symbol(verified)]: true,
//         [Symbol(pendingSession)]: null,
//         [Symbol(async_id_symbol)]: 29,
//         [Symbol(kHandle)]: [TLSWrap],
//         [Symbol(kSetNoDelay)]: false,
//         [Symbol(lastWriteQueueSize)]: 0,
//         [Symbol(timeout)]: null,
//         [Symbol(kBuffer)]: null,
//         [Symbol(kBufferCb)]: null,
//         [Symbol(kBufferGen)]: null,
//         [Symbol(kCapture)]: false,
//         [Symbol(kBytesRead)]: 0,
//         [Symbol(kBytesWritten)]: 0,
//         [Symbol(connect-options)]: [Object],
//         [Symbol(RequestTimeout)]: undefined
//       },
//       _header: 'GET /data/2.5/weather?q=pakistan,islamabad&units=metric&appid=ee3fad6d47e37433c3589c0eddedf354 HTTP/1.1\r\n' +
//         'Accept: application/json, text/plain, */*\r\n' +
//         'User-Agent: axios/0.24.0\r\n' +
//         'Host: api.openweathermap.org\r\n' +
//         'Connection: close\r\n' +
//         '\r\n',
//       _keepAliveTimeout: 0,
//       _onPendingData: [Function: noopPendingOutput],
//       agent: Agent {
//         _events: [Object: null prototype],
//         _eventsCount: 2,
//         _maxListeners: undefined,
//         defaultPort: 443,
//         protocol: 'https:',
//         options: [Object],
//         requests: {},
//         sockets: [Object],
//         freeSockets: {},
//         keepAliveMsecs: 1000,
//         keepAlive: false,
//         maxSockets: Infinity,
//         maxFreeSockets: 256,
//         scheduling: 'lifo',
//         maxTotalSockets: Infinity,
//         totalSocketCount: 1,
//         maxCachedSessions: 100,
//         _sessionCache: [Object],
//         [Symbol(kCapture)]: false
//       },
//       socketPath: undefined,
//       method: 'GET',
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       path: '/data/2.5/weather?q=pakistan,islamabad&units=metric&appid=ee3fad6d47e37433c3589c0eddedf354',
//       _ended: true,
//       res: IncomingMessage {
//         _readableState: [ReadableState],
//         _events: [Object: null prototype],
//         _eventsCount: 3,
//         _maxListeners: undefined,
//         socket: [TLSSocket],
//         httpVersionMajor: 1,
//         httpVersionMinor: 1,
//         httpVersion: '1.1',
//         complete: true,
//         headers: [Object],
//         rawHeaders: [Array],
//         trailers: {},
//         rawTrailers: [],
//         aborted: false,
//         upgrade: false,
//         url: '',
//         method: null,
//         statusCode: 200,
//         statusMessage: 'OK',
//         client: [TLSSocket],
//         _consuming: false,
//         _dumped: false,
//         req: [Circular *1],
//         responseUrl: 'https://api.openweathermap.org/data/2.5/weather?q=pakistan,islamabad&units=metric&appid=ee3fad6d47e37433c3589c0eddedf354',
//         redirects: [],
//         [Symbol(kCapture)]: false,
//         [Symbol(RequestTimeout)]: undefined
//       },
//       aborted: false,
//       timeoutCb: null,
//       upgradeOrConnect: false,
//       parser: null,
//       maxHeadersCount: null,
//       reusedSocket: false,
//       host: 'api.openweathermap.org',
//       protocol: 'https:',
//       _redirectable: Writable {
//         _writableState: [WritableState],
//         _events: [Object: null prototype],
//         _eventsCount: 2,
//         _maxListeners: undefined,
//         _options: [Object],
//         _ended: true,
//         _ending: true,
//         _redirectCount: 0,
//         _redirects: [],
//         _requestBodyLength: 0,
//         _requestBodyBuffers: [],
//         _onNativeResponse: [Function (anonymous)],
//         _currentRequest: [Circular *1],
//         _currentUrl: 'https://api.openweathermap.org/data/2.5/weather?q=pakistan,islamabad&units=metric&appid=ee3fad6d47e37433c3589c0eddedf354',
//         [Symbol(kCapture)]: false
//       },
//       [Symbol(kCapture)]: false,
//       [Symbol(kNeedDrain)]: false,
//       [Symbol(corked)]: 0,
//       [Symbol(kOutHeaders)]: [Object: null prototype] {
//         accept: [Array],
//         'user-agent': [Array],
//         host: [Array]
//       }
//     },
//     data: {
//       coord: { lon: 70, lat: 30 },
//       weather: [ [Object] ],
//       base: 'stations',
//       main: {
//         temp: 9.39,
//         feels_like: 8.31,
//         temp_min: 9.39,
//         temp_max: 9.39,
//         pressure: 1019,
//         humidity: 30,
//         sea_level: 1019,
//         grnd_level: 832
//       },
//       visibility: 10000,
//       wind: { speed: 2.21, deg: 173, gust: 2.31 },
//       clouds: { all: 0 },
//       dt: 1638883572,
//       sys: { country: 'PK', sunrise: 1638842577, sunset: 1638879613 },
//       timezone: 18000,
//       id: 1168579,
//       name: 'Pakistan',
//       cod: 200
//     }
//   }"