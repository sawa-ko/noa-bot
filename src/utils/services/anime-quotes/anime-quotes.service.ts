import { httpClient, IHttpClientOptions } from 'http-client-retry';

export class AnimeQuotesService {
  private apiAnimeChan = 'https://animechanapi.xyz/api/quotes';

  public async getRandomAnimeQuote() {
    const httpClientOptions: IHttpClientOptions = {
      uri: `${this.apiAnimeChan}/random`,
      method: 'GET',
      automaticallyParseJson: true,
    };

    return await httpClient.call(httpClientOptions);
  }
}
