type LocationNode = {
    city_code?: string;
    lng: number;
    lat: number;
    country: string;
    city: string;
    alpha2: string; //Example: CO - Colombia,
    ip: string;
    nodeIdentity: string;
};

export default LocationNode;
