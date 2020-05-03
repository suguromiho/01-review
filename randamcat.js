const axios = require('axios');
const qs = require('querystring');

const LINE_NOTIFY_API_URL = 'https://notify-api.line.me/api/notify';

// GitHub Actions で実行する際に Secret 値 LINE_TOKEN を利用する
// 
// 実際には、GitHub Actions の
// run: LINE_TOKEN=${{secrets.LINE_TOKEN}} node action.js
// という書き方で渡されています
const LINE_NOTIFY_TOKEN = process.env.LINE_TOKEN || '5EDs0KawQDahpoWaAlMs4D3wIgGKTVqdNHV9aiOtfZU';

let config = {
    url: LINE_NOTIFY_API_URL,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
    },
    data: qs.stringify({
      imageFullsize: `https://images.dog.ceo/breeds/airedale/n02096051_3443.jpg`,
      imageThumbnail: `https://images.dog.ceo/breeds/airedale/n02096051_3443.jpg`,
      message: 'ProtoOut Studioからの通知だよー！ https://images.dog.ceo/breeds/airedale/n02096051_3443.jpg',
    })
}

async function getRequest() {

  ////// LINE Notify に送る ////////////////////////

  try {
　 　const CatResponse = await axios.get('https://aws.random.cat/meow');
    const CatImage = CatResponse.data.file;
    console.log(CatResponse.data);
    config.data = qs.stringify({
      imageFullsize: CatImage,
      imageThumbnail: CatImage,
      message: 'ProtoOut Studioからの通知だよー！',
    })

    const responseLINENotify = await axios.request(config); //LINE Notifyに送る
    console.log(responseLINENotify.data);
  } catch (error) {
    console.error(error);
  }

}

// getRequest を呼び出してデータを読み込む
getRequest();