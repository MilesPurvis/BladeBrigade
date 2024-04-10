export class Zone{
  id:number|undefined;
  address:string = "";
  radius:string = "";
  maxDrones:number = 0;

  constructor(address:string,radius:string,maxDrones:number) {
    this.address = address;
    this.radius = radius;
    this.maxDrones = maxDrones;
  }
}
