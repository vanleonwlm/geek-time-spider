const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const turndownService = new TurndownService()
const mysql = require(`mysql-await`);
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'geek_time_spider',
  charset: 'utf8mb4'
});

main();

async function main() {
  const columns = await pool.awaitQuery('select * from geek_column order by id');
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (!column) continue;

    const columnDir = path.join(__dirname, 'markdown', column.title.replaceAll('/', '-'));
    if (!fs.existsSync(columnDir)) {
      fs.mkdirSync(columnDir);
      console.log(`🏀  make column dir: ${columnDir}`);
    }

    const chapters = await pool.awaitQuery('select * from geek_chapter where column_id = ? order by rank', [column.id]);
    const existChapters = chapters.length > 0;
    const chapterDirMap = new Map();
    for (let k = 0; k < chapters.length; k++) {
      const chapter = chapters[k];
      const chapterDir = path.join(columnDir, `${k + 1}-${chapter.title.replaceAll('/', '-')}`);
      chapterDirMap.set(chapter.id, chapterDir);
      if (!fs.existsSync(chapterDir)) {
        fs.mkdirSync(chapterDir);
        console.log(`🪵  make chapter dir: ${columnDir}`);
      }
    }

    const articles = await pool.awaitQuery('select * from geek_article where column_id = ? order by create_time', [column.id]);
    for (let j = 0; j < articles.length; j++) {
      const article = articles[j];
      if (!article) continue;

      let articleFile;
      const title = article.title.replaceAll('/', '-');
      if (existChapters) {
        const chapterDir = chapterDirMap.get(article.chapter_id);
        articleFile = path.join(chapterDir, title + '.md');
      } else {
        articleFile = path.join(columnDir, title + '.md');
      }

      const articleMarkdown = turndownService.turndown(article.content_html);
      fs.writeFileSync(articleFile, articleMarkdown);
      console.log(`🔖  make markdown: ${articleFile}`);
    }
  }
  process.exit();
}
