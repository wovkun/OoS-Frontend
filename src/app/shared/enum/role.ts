export enum Role {
  all = 'all',
  unauthorized = 'unauthorized',
  provider = 'provider',
  providerAdmin = 'provideradmin',
  providerDeputy = 'providerdeputy',
  parent = 'parent',
  techAdmin = 'techadmin',
  ministryAdmin = 'ministryadmin',
  regionAdmin = 'regionadmin',
  areaAdmin = 'areaadmin'
}

export enum EntityType {
  provider = 'provider',
  workshop = 'workshop',
  ProviderAdmin = 'provideradmin',
  ProviderDeputy = 'provider',
  None = 'provider'
}

export enum UserTabParams {
  all,
  parent,
  child
}
