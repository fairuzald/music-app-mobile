const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

// Base URL of the website
const baseUrl = 'https://ncs.io?page=';

// Function to scrape data from a single page
async function scrapePage(page) {
  try {
    // Fetch the HTML from the URL
    const {data} = await axios.get(`${baseUrl}${page}`);
    const $ = cheerio.load(data);

    // Array to store the songs from this page
    const songs = [];
    const now = new Date();

    // Select each song item and extract the relevant data
    $('.row .item').each((index, element) => {
      const $element = $(element);
      const title = $element.find('.bottom p strong').text().trim();
      const artist = $element.find('.bottom .tags').text().trim();
      const url = $element.find('.btn.player-play').attr('data-url');
      const artwork = $element
        .find('.img')
        .css('background-image')
        .replace(/^url\(['"](.+)['"]\)$/, '$1');
      const dateText = $element.find('.col-6.col-lg-6 p').attr('title');
      const date = new Date(dateText);
      const daysAgo = Math.floor((now - date) / (1000 * 60 * 60 * 24));

      // Push the song data to the array
      songs.push({
        id: uuidv4(), // Generate a random UUID for each song
        url: url || '',
        title: title || '',
        artist: artist || '',
        artwork: artwork || '',
        dateText: dateText || '',
        daysAgo: daysAgo,
      });
    });

    return songs;
  } catch (error) {
    console.error(`Error scraping page ${page}:`, error);
    return [];
  }
}

// Function to scrape data from all pages and write to TypeScript files
async function scrapeAllPages(totalPages) {
  try {
    const allSongs = [];
    const recommendations = [];
    const newestSongs = [];
    const popularSongs = [];

    for (let page = 1; page <= totalPages; page++) {
      console.log(`Scraping page ${page}...`);
      const pageSongs = await scrapePage(page);
      allSongs.push(...pageSongs);
    }

    // Generate recommendations, newest songs, and popular songs
    allSongs.forEach(song => {
      if (song.daysAgo <= 15) {
        newestSongs.push(song);
      } else if (song.daysAgo > 7 && song.daysAgo <= 30) {
        recommendations.push(song);
      }

      if (song.daysAgo > 30) {
        popularSongs.push(song);
      }
    });

    // Shuffle newest songs array to get a random selection
    newestSongs.sort(() => 0.5 - Math.random()).splice(5); // Random selection of up to 5 newest songs

    // Shuffle popular songs array to get a random selection
    popularSongs.sort(() => 0.5 - Math.random()).splice(10); // Random selection of up to 10 popular songs

    // Convert the data to TypeScript format
    const tsAllSongs = `export const allSongs = ${JSON.stringify(
      allSongs,
      null,
      2,
    )};\n`;
    const tsRecommendations = `export const recommendationSongs = ${JSON.stringify(
      recommendations,
      null,
      2,
    )};\n`;
    const tsNewestSongs = `export const newestSongs = ${JSON.stringify(
      newestSongs,
      null,
      2,
    )};\n`;
    const tsPopularSongs = `export const popularSongs = ${JSON.stringify(
      popularSongs,
      null,
      2,
    )};\n`;

    // Write TypeScript data to files
    fs.writeFileSync('allSongs.ts', tsAllSongs, 'utf8');
    fs.writeFileSync('recommendationSongs.ts', tsRecommendations, 'utf8');
    fs.writeFileSync('newestSongs.ts', tsNewestSongs, 'utf8');
    fs.writeFileSync('popularSongs.ts', tsPopularSongs, 'utf8');

    console.log(
      'Data successfully written to allSongs.ts, recommendationSongs.ts, newestSongs.ts, and popularSongs.ts',
    );
  } catch (error) {
    console.error('Error scraping all pages:', error);
  }
}

const totalPages = 12;

// Run the scrape function
scrapeAllPages(totalPages);
