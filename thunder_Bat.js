const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.google.com';
const outputFile = 'output.txt';

axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        const titles = $('a').map((i, el) => $(el).text()).get();
        const links = $('a').map((i, el)=> $(el).attr('href')).get();
        fs.writeFile(outputFile, titles.join('\t'));
        fs.writeFileSync(outputFile, links.join('\n'))
    })
    .catch(error => {
        console.error(error);
    });
