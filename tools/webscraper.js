// Node.js web scraper with crawling and content filtering
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
const DEFAULT_MAX_DEPTH = 2; // How many levels deep to crawl
const DEFAULT_MAX_PAGES = 10; // Maximum number of pages to scrape
const OUTPUT_DIR = 'output'; // Directory to save markdown files
// Elements to ignore during Markdown conversion (add CSS selectors)
const IGNORED_ELEMENTS = ['nav', 'footer', 'header', 'script', 'style', '.sidebar', '.menu', '#navigation'];
// --- End Configuration ---

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, OUTPUT_DIR);

// Helper function to generate a valid filename from a URL
function generateFilename(url) {
  try {
    const parsedUrl = new URL(url);
    let hostname = parsedUrl.hostname.replace(/^www\./, '');
    let pathname = parsedUrl.pathname.replace(/\/$/, '').replace(/^\//, '').replace(/\//g, '_');
    if (!pathname || pathname === '_') {
      pathname = 'index';
    }
    // Remove invalid characters for filenames
    const safeHostname = hostname.replace(/[^a-z0-9.-]/gi, '_');
    const safePathname = pathname.replace(/[^a-z0-9_-]/gi, '_');
    return `${safeHostname}_${safePathname}.md`;
  } catch (e) {
    console.warn(`Could not parse URL for filename: ${url}. Using fallback.`);
    // Fallback for invalid URLs
    const safeUrl = url.replace(/[^a-z0-9_-]/gi, '_');
    return `${safeUrl.substring(0, 50)}.md`;
  }
}

// Configure Turndown service
const turndownService = new TurndownService({
    headingStyle: 'atx', // Use '#' for headings
    codeBlockStyle: 'fenced' // Use ``` for code blocks
});

// Add rule to filter out ignored elements
turndownService.remove(IGNORED_ELEMENTS);

// Keep track of visited URLs and crawl queue
const visitedUrls = new Set();
const queue = []; // Stores objects: { url: string, depth: number }
let pagesScraped = 0;

// Main crawling function
async function crawl(startUrl, maxDepth, maxPages) {
  const startUrlObj = new URL(startUrl); // Ensure it's a valid URL
  const allowedDomain = startUrlObj.hostname;

  queue.push({ url: startUrl, depth: 0 });

  while (queue.length > 0 && pagesScraped < maxPages) {
    const { url, depth } = queue.shift();

    if (visitedUrls.has(url) || depth > maxDepth) {
      continue;
    }

    console.log(`[Depth: ${depth}, Page: ${pagesScraped + 1}/${maxPages}] Scraping: ${url}`);
    visitedUrls.add(url);
    pagesScraped++;

    try {
      const newLinks = await scrapePage(url, allowedDomain);

      if (depth < maxDepth) {
        for (const link of newLinks) {
          if (!visitedUrls.has(link)) {
            queue.push({ url: link, depth: depth + 1 });
          }
        }
      }
    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error.message);
    }
     // Add a small delay to be polite to the server
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log(`\nCrawling finished. Scraped ${pagesScraped} pages.`);
  if (queue.length > 0) {
      console.log(`Stopped early because maxPages (${maxPages}) limit was reached.`);
  }
}

// Function to scrape a single page
async function scrapePage(url, allowedDomain) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const html = await response.text();
  const $ = cheerio.load(html);

  // --- Content Extraction ---
  // Try common main content selectors first, fall back to body
  let contentElement = $('main').first();
  if (contentElement.length === 0) {
      contentElement = $('article').first();
  }
  if (contentElement.length === 0) {
      contentElement = $('#content').first();
  }
   if (contentElement.length === 0) {
      contentElement = $('#main-content').first();
  }
  if (contentElement.length === 0) {
      console.warn(`No specific content container found for ${url}, using <body>. Filtering might be less effective.`);
      contentElement = $('body');
  }
  const contentHtml = contentElement.html();
  // --- End Content Extraction ---


  if (!contentHtml) {
    console.warn(`Could not extract content HTML from ${url}.`);
    return []; // Return empty links if no content
  }

  // Convert to Markdown
  const markdown = turndownService.turndown(contentHtml);

  // Save Markdown
  const filename = generateFilename(url);
  const filePath = path.join(outputPath, filename);
  await fs.mkdir(outputPath, { recursive: true });
  await fs.writeFile(filePath, markdown);
  console.log(`   -> Saved to ${filePath}`);

  // Find and process links for further crawling
  const foundLinks = new Set();
  $('a').each((i, element) => {
    const href = $(element).attr('href');
    if (href) {
      try {
        const absoluteUrl = new URL(href, url).toString().split('#')[0]; // Resolve relative URLs and remove fragments
        const linkUrlObj = new URL(absoluteUrl);

        // Only crawl links within the same domain and that are http/https
        if (linkUrlObj.hostname === allowedDomain && ['http:', 'https:',].includes(linkUrlObj.protocol)) {
          foundLinks.add(absoluteUrl);
        }
      } catch (e) {
        // Ignore invalid URLs
      }
    }
  });

  return Array.from(foundLinks);
}

// --- Main Execution ---
const startUrlArg = process.argv[2];
const maxDepthArg = parseInt(process.argv[3], 10) || DEFAULT_MAX_DEPTH;
const maxPagesArg = parseInt(process.argv[4], 10) || DEFAULT_MAX_PAGES;

if (!startUrlArg) {
  console.error('Usage: node scraper.js <startUrl> [maxDepth] [maxPages]');
  console.error('Example: node scraper.js https://example.com 2 20');
  process.exit(1);
}

try {
    new URL(startUrlArg); // Validate start URL early
    console.log(`Starting crawl from: ${startUrlArg}`);
    console.log(`Max Depth: ${maxDepthArg}, Max Pages: ${maxPagesArg}`);
    console.log(`Ignoring elements: ${IGNORED_ELEMENTS.join(', ')}`);
    console.log(`Output directory: ${outputPath}\n`);
    crawl(startUrlArg, maxDepthArg, maxPagesArg);
} catch (e) {
    console.error(`Invalid start URL provided: ${startUrlArg}`);
    process.exit(1);
}