import {
  CommandNotFound,
  Discord,
  CommandMessage,
  On,
  ArgsOf,
  Client,
} from '@typeit/discord';
import { join } from 'path';

@Discord('noa ', {
  import: [
    join(__dirname, 'commands/**', '*.ts'),
    join(__dirname, 'commands/**', '*.js'),
  ],
})
export class DiscordApp {
  @On('message')
  onMessage([message]: ArgsOf<'message'>, client: Client) {
    // console.log(message);
  }

  @On('ready')
  async onReady(args, bot) {
    bot.user.setActivity(
      'noa ayuda | Con este comando puedes ver lo que puedo hacer (￣▽￣)ノ',
    );
  }

  @CommandNotFound()
  notFoundA(command: CommandMessage) {
    command.reply('Command not found');
  }
}
