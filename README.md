# geek-time-spider

Just for learning, if you have any questions contact me, I will delete.

1. Create database "geek_time_spider" in mysql
2. Import geek_time_spider.sql to database
3. Login [极客时间](https://time.geekbang.org/) and copy cookie
4. Open spider.js, update cookie
5. Crawl columns, just execute ```node spider.js```, spider will crawl columns data to database
6. Preview columns in browser, just execute ```node preview.js```, then access http://127.0.0.1:4000/columns
7. Convert columns to markdown files, just execute ```node markdown.js```
