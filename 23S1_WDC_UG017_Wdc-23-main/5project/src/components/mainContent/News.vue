<template>
  <div class="news-list">
    <div v-for="(news, index) in pagedNewsList" :key="index" class="news-item" style="justify-content: center;">
      <h3 class="news-title">{{ news.title }}</h3>
      <p class="news-summary">{{ news.summary }}</p>
      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target="'#newsDetails' + index"
        aria-expanded="false" :aria-controls="'newsDetails' + index" >
        detail
      </button>
      <div :id="'newsDetails' + index" class="collapse">
        <div class="card card-body">
          <p class="news-content">{{ news.content }}</p>
          <p><strong>club:</strong>{{ news.club_name }}</p>
          <img :src="news.imageSrc" alt="" class="news-image" />
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">上一页</a>
        </li>
        <li class="page-item" v-for="page in pageCount" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === pageCount }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">下一页</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style>
/* 新闻列表容器样式 */
.news-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width:100%;
  max-height: 78vh;
  overflow-y: scroll;
}


/* 新闻项样式 */
.news-item {
  margin-bottom: 20px;
}

/* 新闻标题样式 */
.news-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}

/* 新闻摘要样式 */
.news-summary {
  color: #888;
  margin-bottom: 10px;
}

/* 展开详情按钮样式 */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  font-weight: bold;
}
.news-content {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.news-image {
  width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* 分页导航样式 */
.pagination {
  margin-top: 20px;
}

/* 分页项目样式 */
.page-item {
  display: inline-block;
  margin-right: 5px;
}

/* 当前页样式 */
.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

/* 禁用项样式 */
.page-item.disabled .page-link {
  background-color: #f2f2f2;
  border-color: #f2f2f2;
  color: #ccc;
}
</style>

<script>
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';

export default {
  name: 'NewsList',
  data() {
    return {
      newsList: [],
      pageSize: 6,
      currentPage: 1
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.newsList.length / this.pageSize);
    },
    pagedNewsList() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.newsList.slice(startIndex, endIndex);
    }
  },
  created() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const apiUrl = 'http://localhost:3000/api';
        const response = await axios.post(`${apiUrl}/newsList`);
        this.newsList = response.data;
      } catch (error) {
        console.error('Error fetching news:', error);
        alert('Failed to fetch news.');
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.currentPage = page;
      }
    }
  }
};
</script>
