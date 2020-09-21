import { httpClient, IHttpClientOptions } from 'http-client-retry';

import '../../env/configuration';

export class GiphyService {
  private apiGiphy = 'https://api.giphy.com/v1/gifs';

  public async getRandom() {
    const httpClientOptions: IHttpClientOptions = {
      uri: `${this.apiGiphy}/random?api_key=${process.env.GIPHY_KEY}&limit=1`,
      method: 'GET',
      automaticallyParseJson: true,
    };

    return await httpClient.call(httpClientOptions);
  }

  public async getAnimeGifByName(name: string) {
    const httpClientOptions: IHttpClientOptions = {
      uri: `${this.apiGiphy}/search?api_key=${process.env.GIPHY_KEY}&q=${name}&limit=1`,
      method: 'GET',
      automaticallyParseJson: true,
    };

    return await httpClient.call(httpClientOptions);
  }
}
