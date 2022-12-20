import axios from 'axios';
import LocationNode from '../../../types/locationNode';
import { NodesPerCountry, NodesPerCity } from 'types/nodesLocation';
import sortBy from 'lodash/sortBy';
import { store } from "../../../App.tsx";
import { baseEndpoint } from 'utils/magellan-api-utils';
import { getBaseUrl } from 'api/utils';

class Utils {

  constructor() {

  }

  public static async getNodeData(): Promise<LocationNode[]> {
    return new Promise((resolve, reject) => {
      let networks = store.getState().appConfig;
      let activeNetwork = networks.networks.find(
        element => element.id === networks.activeNetwork,
      );

      var data = JSON.stringify({
        rpc: `${activeNetwork?.protocol}://${activeNetwork?.host}:${activeNetwork?.port}`,
        ip_provider: "ip-api",
      });

      var request = {
        method: 'post',
        url: Utils.getURLMagelland(),
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(request)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject([]);
          console.log(error);
        });
    });
  }

  public static sumNodesPerCountry(info: LocationNode[]): NodesPerCountry[] {
    let dataCountry: NodesPerCountry[] = [];
    for (let i = 0; i < info.length; i++) {
      if (dataCountry.some((dat: any) => dat.alpha2 == info[i].alpha2)) {
        let locationNode: LocationNode = info[i];
        let indexDataCountry = dataCountry.findIndex(
          (dat: any) => dat.alpha2 == info[i].alpha2,
        );
        dataCountry[indexDataCountry].nodes.push(locationNode.nodeIdentity);
      } else {
        let nodePerCountry: NodesPerCountry = {
          alpha2: info[i].alpha2,
          country: info[i].country,
          nodes: [info[i].nodeIdentity],
        };
        dataCountry.push(nodePerCountry);
      }
    }

    return sortBy(dataCountry, o => -o.nodes.length);
  }

  public static sumNodesPerCity(info: LocationNode[]): NodesPerCity[] {
    let dataCity: NodesPerCity[] = [];
    for (let i = 0; i < info.length; i++) {
      if (dataCity.some((dat: any) => dat.city == info[i].city && dat.alpha2 == dat.alpha2)) {
        let locationNode: LocationNode = info[i];
        let indexdataCity = dataCity.findIndex((dat: any) => dat.city == info[i].city && dat.alpha2 == dat.alpha2);
        dataCity[indexdataCity].nodes.push(locationNode.nodeIdentity);
      } else {
        let nodePerCountry: NodesPerCity = {
          alpha2: info[i].alpha2,
          country: info[i].country,
          nodes: [info[i].nodeIdentity],
          city: info[i].city,
          lng: info[i].lng,
          lat: info[i].lat
        };
        dataCity.push(nodePerCountry);
      }
    }
    return sortBy(dataCity, o => -o.nodes.length);
  }

  private static getURLMagelland() 
  {
    //let urlBase = `${getBaseUrl()}${baseEndpoint}`;
    let urlBase = `http://127.0.0.1:5000/infoIP`;
    return urlBase;
  }

}

export default Utils;
