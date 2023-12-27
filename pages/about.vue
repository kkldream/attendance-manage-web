<template>
  <a-typography>
    <a-typography-title>點名管理系統</a-typography-title>

    <a-typography-paragraph>
      由於我們實驗室每天必需有一位負責人點完名後，填寫完表格並寄送Email到教授和各位學生的信箱，此專案目的就是簡化上述的流程，負責人只需進到此頁面並點擊幾下，即可完成一堆麻煩的流程，並且每次的點名記錄也保存在網頁上，供大家快速瀏覽。
    </a-typography-paragraph>

    <a-typography-title :level="2">技術實現</a-typography-title>
    <a-typography-paragraph>
      這個專案致力於優化實驗室每日點名與報告流程，以提升效率並降低人為錯誤。在技術實現上，我們運用了多種先進的工具和框架。
    </a-typography-paragraph>

    <a-typography-paragraph>
      <ul>
        <li>
          <a-typography-link href="#database">資料庫方面</a-typography-link>
        </li>
        <li>
          <a-typography-link href="#frontend">前端方面</a-typography-link>
        </li>
      </ul>
    </a-typography-paragraph>

    <a-typography-paragraph>
      對於實際操作，負責人只需進入專屬的網頁頁面，透過少數點擊即可完成點名和報告的所有步驟。同時，系統會自動將點名記錄保存在MongoDB中，供所有成員隨時查閱。
    </a-typography-paragraph>

    <a-typography-title id="database" :level="3">資料庫方面</a-typography-title>
    <a-typography-paragraph>
      我們採用了 MongoDB 作為資料庫，這是一個NoSQL資料庫，具有出色的擴展性，能夠輕鬆應對資料量的增加。其靈活的資料模型使得資料的儲存和檢索更加高效。
      <a-flex justify="center">
        <img alt="MongoDB" src="https://www.gaia.net/storage/news/f71d037f-3319-4ed8-82ae-19434b841aec.png"
             style="height: 30vh"/>
      </a-flex>
    </a-typography-paragraph>

    <a-typography-title id="frontend" :level="3">前端方面</a-typography-title>
    <a-typography-paragraph>
      我們採用了 Nuxt.js 框架，這不僅支援Vue.js的組件化開發，還提供了伺服器端渲染（SSR），有助於提升網頁性能和解決SEO的問題。此外，我們選用了
      Ant-Design CSS 框架，以其現成的類別和高度可定制的特性，快速實現漂亮且易於維護的前端介面。
      <a-flex justify="center" wrap="wrap">
        <img alt="Nuxt" src="data:image/png;base64,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"
             style="height: 20vh; margin: 0 8px 8px;"/>
        <img alt="Ant Design Vue" src="https://www.timelessq.com/upload/202012/thumb/f74d372bcbb69f70-w680-h440.jpg"
             style="height: 20vh; margin: 0 8px 8px;"/>
      </a-flex>
      <a-flex justify="center">
      </a-flex>
    </a-typography-paragraph>

    <a-typography-title :level="2">總括而言</a-typography-title>
    <a-typography-paragraph>
      這個專案在技術選擇和實現上追求了效率、易用性和可擴展性。透過結合MongoDB、Node.js、Nuxt.js和 Ant-Design
      CSS，我們成功打造了一個現代化、高效率的點名系統，使實驗室流程更加流暢且容易管理。
    </a-typography-paragraph>
  </a-typography>
</template>
<script setup lang="ts">
</script>