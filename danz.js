const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");

const clean = e => (e = e.replace(/(<br?\s?\/>)/gi, " \n")).replace(/(<([^>] )>)/gi, "");

async function shortener(e) {
  return e;
}

async function tiktok(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let t = await axios("https://lovetik.com/api/ajax/search", { method: "post", data: new URLSearchParams(Object.entries({ query: url })) });

      const result = {};
      result.title = clean(t.data.desc);
      result.author = clean(t.data.author);
      result.nowm = await shortener((t.data.links[0].a || "").replace("https", "http"));
      result.watermark = await shortener((t.data.links[1].a || "").replace("https", "http"));
      result.audio = await shortener((t.data.links[2].a || "").replace("https", "http"));
      result.thumbnail = await shortener(t.data.cover);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function jadwalSholat() {
    try {
        const { data } = await axios.get("https://prayer-times.muslimpro.com/en/find?country_code=ID&country_name=Indonesia&city_name=undefined&coordinates=-6.1944491,106.8229198#");
        const $ = cheerio.load(data);

        const tahunSekarang = $('li.monthpicker .display-month').text().trim();

        const jadwalShalat = [];
        $('table.prayer-times tbody tr').each((index, element) => {
            const tanggal = $(element).find('td.prayertime-1').text().trim();
            const imsak = $(element).find('td.prayertime').eq(0).text().trim();
            const shubuh = $(element).find('td.prayertime').eq(1).text().trim();
            const duhur = $(element).find('td.prayertime').eq(2).text().trim();
            const asar = $(element).find('td.prayertime').eq(3).text().trim();
            const magrib = $(element).find('td.prayertime').eq(4).text().trim();
            const isya = $(element).find('td.prayertime').eq(5).text().trim();

            if (tanggal) {
                jadwalShalat.push({ tanggal, imsak, shubuh, duhur, asar, magrib, isya });
            }
        });
        
        const hariIni = []

        $('div.prayer-daily-table ul li').each((index, element) => {
            const sholat = $(element).find('.waktu-solat').text().trim();
            const jadwal = $(element).find('.jam-solat').text().trim();
            hariIni.push({ sholat, jadwal });
        });

        return {
            tahunSekarang,
            jadwalShalat,
            hariIni
        }

    } catch (error) {
        return error.message;
    }
}



async function JadwalTvBola() {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
    }

    const response = await axios.get('https://www.goal.com/id/berita/jadwal-siaran-langsung-sepakbola/1qomojcjyge9n1nr2voxutdc1n', { headers })

    
    const $ = cheerio.load(response)

    let hasil = []

    $('table tbody tr').each((_, el) => {
      const kolek = $(el).find('td')
      const time = $(kolek[0]).text().trim()
      const match = $(kolek[1]).text().trim()
      const liga = $(kolek[2]).text().trim()
      const televisi = $(kolek[3]).text().trim() || 'Gak tau'

      if (time && match && liga) {
        const [tim1, tim2] = match.split(' vs ')
        hasil.push({ time, match, tim1, tim2, liga, televisi })
      }
    })

    return hasil
  } catch (err) {
    throw Error(err.message)
  }
}

async function tiktokdll(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set("url", query);
      encodedParams.set("hd", "1");

      const response = await axios({
        method: "POST",
        url: "https://tikwm.com/api/",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie: "current_language=en",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
        data: encodedParams,
      });
      const videos = response.data;
      resolve(videos);
    } catch (error) {
      reject(error);
    }
  });
}

async function pinterest(query) {
return new Promise(async(resolve,reject) => {
axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + query, {
headers: {
"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
}
}).then(({ data }) => {
const $ = cheerio.load(data)
const result = [];
const hasil = [];
$('div > a').get().map(b => {
const link = $(b).find('img').attr('src')
result.push(link)
});
result.forEach(v => {
if(v == undefined) return
hasil.push(v.replace(/236/g,'736'))
})
hasil.shift();
resolve(hasil)
})
})
}

async function listmember(query) {
  try {
    const { data } = await axios.get('https://jkt48.com/member/list?lang=id');
    const $ = cheerio.load(data);
    const members = [];
//dibuat oleh hann
    $('div.col-4.col-lg-2').each((_, element) => {
      let name = $(element).find('.entry-member__name a').html();
      if (name) {
        name = name.replace(/<br\s*\/?>/g, ' ').trim();
      }

      const profileLink = $(element).find('.entry-member a').attr('href');
      const imageSrc = $(element).find('.entry-member img').attr('src');

      if (!name || !profileLink || !imageSrc) {
        console.log('Error in element:', $(element).html());
      }

      members.push({
        name,
        profileLink: profileLink ? `https://jkt48.com${profileLink}` : null,
        imageSrc: imageSrc ? `https://jkt48.com${imageSrc}` : null
      });
    });

    return members;
  } catch (error) {
    return error.message;
  }
}

async function brat(text) {
  try {
    return await new Promise((resolve, reject) => {
      if(!text) return reject("missing text input");
      axios.get("https://brat.caliphdev.com/api/brat", {
        params: {
          text
        },
        responseType: "arraybuffer"
      }).then(res => {
        const image = Buffer.from(res.data);
        if(image.length <= 10240) return reject("failed generate brat");
        return resolve({
          success: true, 
          image
        })
      })
    })
  } catch (e) {
    return {
      success: false,
      errors: e
    }
  }
}

async function luminai(content) {
  try {
    const response = await axios.post('https://luminai.my.id/', { content });
    return response.data;
  } catch (error) {
    console.error("Error fetching content from LuminAI:", error);
    throw error;
  }
}

                                         
async function igdl(url) {
            let res = await axios("https://indown.io/");
            let _$ = cheerio.load(res.data);
            let referer = _$("input[name=referer]").val();
            let locale = _$("input[name=locale]").val();
            let _token = _$("input[name=_token]").val();
            let { data } = await axios.post(
              "https://indown.io/download",
              new URLSearchParams({
                link: url,
                referer,
                locale,
                _token,
              }),
              {
                headers: {
                  cookie: res.headers["set-cookie"].join("; "),
                },
              }
            );
            let $ = cheerio.load(data);
            let result = [];
            let __$ = cheerio.load($("#result").html());
            __$("video").each(function () {
              let $$ = $(this);
              result.push({
                type: "video",
                thumbnail: $$.attr("poster"),
                url: $$.find("source").attr("src"),
              });
            });
            __$("img").each(function () {
              let $$ = $(this);
              result.push({
                type: "image",
                url: $$.attr("src"),
              });
            });

            return result;
}

async function capcut(url) {
    try {
        const response = await axios.post("https://api.teknogram.id/v1/capcut", { url });
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function pindl(url) {
    try {
        let a = await axios.get(url, {
            headers: {
                'User-Agent': "Mozilla/5.0 (Linux; Android 12; SAMSUNG SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/17.0 Chrome/96.0.4664.104 Mobile Safari/537.36",
                'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            }
        })

        let $ = cheerio.load(a.data)
        let x = $('script[data-test-id="leaf-snippet"]').text()
        let y = $('script[data-test-id="video-snippet"]').text()

        let g = {
            status: true,
            isVideo: y ? true : false,
            info: JSON.parse(x),
            image: JSON.parse(x).image,
            video: y ? JSON.parse(y).contentUrl : ''
        }

        return g
    } catch (e) {
        return {
            status: false,
            mess: "failed download"
        }
    }
}

async function tiktoksearch(query) {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://tikwm.com/api/feed/search',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'current_language=en',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
      },
      data: {
        keywords: query,
        count: 10,
        cursor: 0,
        HD: 1
      }
    });

    const videos = response.data.data.videos;
    if (videos.length === 0) {
      throw new Error("Tidak ada video ditemukan.");
    } else {
      const gywee = Math.floor(Math.random() * videos.length);
      const videorndm = videos[gywee]; 

      const result = {
        title: videorndm.title,
        cover: videorndm.cover,
        origin_cover: videorndm.origin_cover,
        no_watermark: videorndm.play,
        watermark: videorndm.wmplay,
        music: videorndm.music
      };
      return result;
    }
  } catch (error) {
    throw error;
  }
}



async function blackboxai(url) {
        try {
          const response = await axios.post('https://www.blackbox.ai/api/chat', {
            messages: [{ id: null, content: message, role: 'user' }],
            id: null,
            previewToken: null,
            userId: null,
            codeModelMode: true,
            agentMode: {},
            trendingAgentMode: {},
            isMicMode: false,
            isChromeExt: false,
            githubToken: null
          });
      
          return response.data;
        } catch (error) {
          throw error;
        }
      }

async function aiodl(url) {
  try {
    const response = await axios.post("https://aiovd.com/wp-json/aio-dl/video-data", {
      url: url
    }, 
    {
      headers: {
        'Accept': '/',
        'Content-Type': 'application/json'
      }
    });

    const res = response.data;
    const result = {
      data: res.medias
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  tiktok,
  igdl,
  capcut,
  tiktoksearch,
  pindl,
  listmember,
  luminai,
  pinterest,
  brat,
  tiktokdll,
  JadwalTvBola,
  jadwalSholat,
  aiodl
}
