export class Drone{
  id:number|undefined;
  droneBrand:string = "";
  droneModel:string = "";
  droneName:string = "";
  droneColor:string = "";
  droneWeight:number = 0;
  pilotCert:boolean = false;
  customModified:boolean = false;
  droneImage:any = null;

  constructor(droneBrand:string,droneModel:string,droneName:string,droneColor:string,droneWeight:number,pilotCert:boolean,customModified:boolean, droneImage:any) {
    this.droneBrand = droneBrand;
    this.droneModel = droneModel;
    this.droneName = droneName;
    this.droneColor = droneColor;
    this.droneWeight = droneWeight;
    this.pilotCert = pilotCert;
    this.customModified = customModified;
    this.droneImage = droneImage;
  }
}
