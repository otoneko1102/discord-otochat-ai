const { Client } = require("discord.js");
const options = { intents: ["GUILDS", "GUILD_MESSAGES"] };
const client = new Client(options);

const json = require("./words.json");
const fs = require('fs');

const TinySegmenter = require('tiny-segmenter')
const segmenter = new TinySegmenter()

client.on("ready", () => {
  console.log(`${client.user.username} login!`);
  setInterval(() => {
    client.user.setPresence({
      status: 'idle',
      activities: [
        {
          name: `${json.words.length} words`,
          type: 'WATCHING'
        },
      ],
    });
  }, 20000)
})

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.mentions.has(client.user)) {
    const mentionRegex = /<@!?[0-9]+>|<@&[0-9]+>|<@#[0-9]+>/g;
    const badwords = json.badwords;
    const contentWithoutMention = message.content.replace(mentionRegex, ' ');
    let content = contentWithoutMention;
    if (content.length > 100) return message.reply("メッセージが長すぎます");
    if (content) {
      const ary = segmenter.segment(content);
      const newWords = json.words;
      ary.forEach(word => {
        if (!newWords.includes(word) && !badwords.join(',').match(word)) {
          newWords.push(word);
          console.log('登録: ' + word);
        }
      });
      json.words = newWords;
      fs.writeFile('./words.json', JSON.stringify(json, null, 2), (err) => {
        if (err) {
          console.error('ファイルを書き込む際にエラーが発生しました: ', err);
        } else {
          console.log('JSONファイルが正常に更新されました');
        }
      });
    }
    const number = Math.floor(Math.random() * 6 + 1);
    const str = []
    for (let i = 0;i <= number;i++) {
      const word = json.words[Math.floor(Math.random() * json.words.length)];
      str.push(word)
    };
    message.reply(str.join(''))
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
