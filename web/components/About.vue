<!-- Please remove this file from your project -->
<template>
  <main class="main--">
    <div class="main--banner">
      <!-- banner -->
      <b-card
        overlay
        :img-src="imgUrl"
        :img-alt="detail.name"
        text-variant="white"
        :title="detail.name"
      >
      </b-card>
    </div>

    <!-- 面包屑 -->
    <div class="main--breadcrumb">
      <nav aria-label="breadcrumb">
        <b-breadcrumb :items="items"></b-breadcrumb>
      </nav>
    </div>

    <div class="row">
      <div class="col-12 col-md-3">
        <b-list-group>
          <b-list-group-item href="/about" :active="category === 'about'"
            >关于我们</b-list-group-item
          >
          <b-list-group-item href="/contact" :active="category === 'contact'"
            >联系我们</b-list-group-item
          >
        </b-list-group>
      </div>
      <div class="col">
        <b-card :title="detail.name" class="main--rich__text">
          <b-card-text v-html="detail.content"></b-card-text>
        </b-card>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: function() {
        return "about";
      }
    }
  },
  data: () => ({
    detail: {},
    items: [
      {
        text: "首页",
        href: "/"
      },
      {
        text: "关于我们",
        active: true
      }
    ],
    imgUrl: null
  }),
  head() {
    return {
      title: this.detail.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.detail.description
        }
      ]
    };
  },
  async fetch() {
    const detail = await this.$http.$get(`api/about/${this.category}`);
    const { name } = detail;
    this.items[1].text = name;
    this.detail = detail;
    const url = `${this.staticHost}${this.detail.banner.replace('public/', '')}`;
    this.imgUrl = url;
    // this.imgUrl = this.imgUrlToBase64(url);
  },
  methods: {
    /**
     * 图片链接转成base64
     * @param {*} imgUrl 图片链接
     * @returns {string} base64地址
     */
    // imgUrlToBase64(imgUrl){
    //   let base64Url = "";
    //   let image = new Image();
    //   image.setAttribute("crossOrigin", "anonymous");//解决跨域问题
    //   image.src = imgUrl;
    //   image.onload = function() {//image.onload为异步加载
    //     let canvas = document.createElement("canvas");
    //     canvas.width = image.width;
    //     canvas.height = image.height;
    //     let context = canvas.getContext("2d");
    //     context.drawImage(image, 0, 0, image.width, image.height);
    //     //这里的base64Url就是base64类型
    //     //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
    //     base64Url = canvas.toDataURL("image/jpeg", 1);
    //   }
    //   return base64Url;
    // },

  },
  computed: {
    staticHost() {
      return this.$store.state.staticHost;
    }
  },
  created() {}
};
</script>
