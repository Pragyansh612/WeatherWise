const country = 'India';
let temp = ''
let min = ''
let max = ''
let humid = ''
let press = ''
let sea_level = ''
let ground_level = ''
let real_temp = document.getElementById("real-temp")
let all_temp = document.getElementById("all-temp")
let humidity = document.getElementById("humidity")
let pressure = document.getElementById("Pressure")
function handlesubmit() {
    const city = document.getElementById("search").value;
    const head = document.getElementById("head");
    head.innerHTML = `Weather for ${city}`;
    fetchdata(city);
}
const fetchdata = async (city) => {
    const url = `https://rapidweather.p.rapidapi.com/data/2.5/forecast?q=${city}%2C${country}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '79658f2c23mshccd35870fb99e29p15817djsn8ad0a3eb8c42',
            'x-rapidapi-host': 'rapidweather.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        let res = result.split(',')
        let tem = res[4].match(/(\d+)/)
        let mini = res[6].match(/(\d+)/)
        let maxi = res[7].match(/(\d+)/)
        let humi = res[11].match(/(\d+)/)
        let pres = res[8].match(/(\d+)/)
        let sea = res[9].match(/(\d+)/)
        let ground = res[10].match(/(\d+)/)
        if (tem) {
            temp = tem[0] - 273
            min = mini[0] - 273
            max = maxi[0] - 273
            humid = humi[0]
            press = pres[0]
            sea_level = sea[0]
            ground_level = ground[0]
        }
        real_temp.innerHTML = `${temp} C`
        all_temp.innerHTML = `Temperature is ${temp} <br>
                              Minimum Temperature is ${min} <br>
                              Maximum Temperature is ${max}`
        humidity.innerHTML = `${humid}%`
        pressure.innerHTML = `Pressure is ${press} <br>
                              Sea Level is ${sea_level} <br>
                              Ground Level is ${ground_level}`
    } catch (error) {
        console.error(error);
    }
};