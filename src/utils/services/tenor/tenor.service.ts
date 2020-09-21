import { httpClient, IHttpClientOptions } from 'http-client-retry';

import '../../env/configuration';

export class TenorService {
  private apiTenor = 'https://api.tenor.com/v1';

  public async getRandom(name: string) {
    const httpClientOptions: IHttpClientOptions = {
      uri: `${this.apiTenor}/random?q=${name}&key=${process.env.TENOR_KEY}&limit=1`,
      method: 'GET',
      automaticallyParseJson: true,
    };

    return await httpClient.call(httpClientOptions);
  }

  public async getAnimeGifByName(name: string) {
    const httpClientOptions: IHttpClientOptions = {
      uri: `${this.apiTenor}/search?q=${name}&key=${process.env.TENOR_KEY}&limit=1`,
      method: 'GET',
      automaticallyParseJson: true,
    };

    return await httpClient.call(httpClientOptions);
  }
}
