import { Injectable } from '@angular/core';

declare const H:any;
@Injectable({
  providedIn: 'root'
})
export class GeoService {
  hMapPlatform = new H.service.Platform({
    'apikey': 'cU638kKX9v40v8qGZfXBEwk8OFEBSoPKIz3lyA03o_g'
  });

  constructor() { }

  getCurrentLocation():Promise<any>{
  return new Promise<any>((resolve, reject)=>{

    navigator.geolocation.getCurrentPosition((position)=>{
      resolve({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      });
    }, (e)=>{
      reject({
        code:e.code,
        message:e.message
      })
    },{
      timeout:1000,
      maximumAge:0,
      enableHighAccuracy:true
    })
  })
}

getLocationLatLon(lat:number,lon:number):Promise<any>{
    return new Promise<any>((resolve, reject) => {
    let geocoder = this.hMapPlatform.getSearchService();

    const options = {
      at:`${lat},${lon}`
    }

      geocoder.reverseGeocode(options, (data:any) => {
        resolve(data.items[0].address.label)
      }, alert);
    })
}

  getLocationByAddress(address: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let geocoder = this.hMapPlatform.getSearchService()

      const options = {
        q: `${address}`
      }

      geocoder.geocode(
        options,
        (data: any) => {

          resolve(data.items[0].position);
        },
        (err: any) => {
          reject('Can\'t reach the remote server to get location');
        }
      );

    })
  }

}
