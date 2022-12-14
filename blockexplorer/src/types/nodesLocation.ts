
export type NodesPerCountry = {
  country: string;
  alpha2: string;
  nodes: string[];
};

export type NodesPerCity = NodesPerCountry & {
  city: string   
}