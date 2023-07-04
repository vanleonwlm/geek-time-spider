// mysql config
const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'geek_time_spider'
};

// connect to mysql
const mysql = require(`mysql-await`);
const pool = mysql.createPool({
    connectionLimit: 10,
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    charset: 'utf8mb4'
});

// start app
const express = require('express');
const app = express();
const port = 4000;
app.listen(port, () => {
    console.log(`geek-time-spider app listening on port ${port}`);
});

const nunjucks = require('nunjucks');
nunjucks.configure('view', { autoescape: false });

const fs = require('fs');
function getTemplateHtml(name) {
    return fs.readFileSync('./template/' + name + '.html');
}

// routers
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/columns', async (req, res) => {
    const columns = await listColumns();

    columns.forEach(column => {
        const author = JSON.parse(column.author_json);
        column.author = author;
    });

    const columns_html = nunjucks.render('columns.html', { columns: columns });
    res.send(columns_html);
});
app.get('/columns/:column_id', async (req, res) => {
    const column_id = parseInt(req.params.column_id);
    const column = await getColumn(column_id);
    if (!column) {
        res.send('专栏不存在');
        return;
    }

    const author = JSON.parse(column.author_json);
    column.author = author;

    const chapters = await listChapters(column_id);
    column.chapters = chapters;

    const articles = await listArticles(column_id);
    column.articles = articles;

    const column_html = nunjucks.render('column.html', column);
    res.send(column_html);
});
app.get('/articles/:article_id', async (req, res) => {
    const article_id = parseInt(req.params.article_id);
    const article = await getArticle(article_id);
    if (!article) {
        res.send('文章不存在');
        return;
    }

    const column = await getColumn(article.column_id);
    article.column = column;

    const chapter = await getChapter(article.chapter_id);
    article.chapter = chapter;

    const article_html = nunjucks.render('article.html', article);
    res.send(article_html);
});

// query db methods
async function listColumns() {
    const rows = await pool.awaitQuery('select * from geek_column where is_delete = "N"');
    return rows;
}
async function getColumn(id) {
    const rows = await pool.awaitQuery('select * from geek_column where is_delete = "N" and id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
}
async function listArticles(column_id) {
    const rows = await pool.awaitQuery('select id, create_time, title, subtitle, intro, intro_html, column_id, chapter_id from geek_article where is_delete = "N" and column_id = ?', [column_id]);
    return rows;
}
async function getArticle(id) {
    const rows = await pool.awaitQuery('select * from geek_article where is_delete = "N" and id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
}
async function listChapters(column_id) {
    const rows = await pool.awaitQuery('select * from geek_chapter where is_delete = "N" and column_id = ? order by `rank`', [column_id]);
    return rows;
}

async function getChapter(id) {
    const rows = await pool.awaitQuery('select * from geek_chapter where is_delete ="N" and id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
}
