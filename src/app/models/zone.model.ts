export class Zone{
  id:number|undefined;
  address:string = "";
  radius:number = 0;
  maxDrones:number = 0;

  constructor(address:string,radius:number,maxDrones:number) {
    this.address = address;
    this.radius = radius;
    this.maxDrones = maxDrones;
  }
}
