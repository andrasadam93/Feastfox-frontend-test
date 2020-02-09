import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/xml',
    'Authorization': 'jwt-token'
  })
};

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class GetweatherService {

  constructor(private http: HttpClient) {
    /*
      App ID
      L96fNy3e
      Client ID (Consumer Key)
      dj0yJmk9R0d2Mk5YSkFZa3FTJmQ9WVdrOVREazJaazU1TTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWU5
      Client Secret (Consumer Secret)
      dd48872896c51f6e112b43224117b56596ae8dba
      --> https://developer.yahoo.com/weather/documentation.html#oauth-javascript
      --> https://developer.yahoo.com/weather/ 
    */
  }

  // these are not very proper to have declared here, within the class but for now it will do
  url = 'https://cors-anywhere.herokuapp.com/https://weather-ydn-yql.media.yahoo.com/forecastrss';
  method = "GET";
  consumer_key = "dj0yJmk9R0d2Mk5YSkFZa3FTJmQ9WVdrOVREazJaazU1TTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWU5";
  consumer_secret = "";
  concat = "&";
  query = {"location":"sunnyvale,ca","format":"json"};
  oauth = {
    'oauth_consumer_key': this.consumer_key,
    'oauth_nonce': Math.random().toString(36).substring(2),
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': parseInt((new Date().getTime() / 1000).toString()).toString(),
    'oauth_version': '1.0'
  }

  CryptoJS = require("crypto-js"); // this should also definitely not be included here, but I tried to keep it simple for now

  getWeather() {
    var self = this; // this is needed for the object.keys mapping of oauth
    var merged = {};
    Object.assign(merged,this.query,this.oauth); // object.assign instead of jquery solution
    // Note the sorting here is required
    var merged_arr = Object.keys(merged).sort().map(function(k) {
      return [k + '=' + encodeURIComponent(merged[k])];
    });
    var signature_base_str = this.method
      + this.concat + encodeURIComponent(this.url)
      + this.concat + encodeURIComponent(merged_arr.join(this.concat));

    var composite_key = encodeURIComponent(this.consumer_secret) + this.concat;
    var hash = this.CryptoJS.HmacSHA1(signature_base_str, composite_key);
    console.log(hash);
    var signature = hash.toString(this.CryptoJS.enc.Base64); // this.CryptoJS.enc.Base64.stringify(hash);//

    this.oauth['oauth_signature'] = signature;
    var auth_header = 'OAuth ' + Object.keys(this.oauth).map(function(k) {
      return [k + '="' + self.oauth[k] + '"'];
    }).join(',');

    console.log(auth_header);

    httpOptions.headers = httpOptions.headers.set('X-Yahoo-App-Id', 'L96fNy3e');
    httpOptions.headers = httpOptions.headers.set('Authorization', auth_header);
    return this.http.get(this.url,httpOptions);
  }
}

export interface weatherData {
  // if done properly and not in a hurry, the queried data should be handled by an interface
}