export enum Role {
  all = 'all',
  unauthorized = 'unauthorized',
  provider = 'provider',
  providerDeputy = 'providerdeputy',
  employee = 'employee',
  parent = 'parent',
  techAdmin = 'techadmin',
  ministryAdmin = 'ministryadmin',
  regionAdmin = 'regionadmin',
  areaAdmin = 'areaadmin'
}

export enum EntityType {
  provider = 'provider',
  workshop = 'workshop',
  providerDeputy = 'provider',
  employee = 'employee',
  None = 'provider'
}

export enum UserTabParams {
  all,
  parent,
  child
}
