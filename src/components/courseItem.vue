<template>
  <div class="card" @click="jumpToDetail">
    <header
      :style="{ backgroundImage: 'url(' + course.imageUrl + ')' }"
    ></header>
    <div class="card-body">
      <p class="title">
        <strong>{{ course.name }}</strong>
      </p>
      <p>
        <span>{{ course.description }}</span>
      </p>
    </div>
    <div class="footer">
      <p>
        <span style="font-weight: bold;font-size:0.5rem">WHEN</span>
      </p>
      <p>
        <span style="font-size: 0.5rem">{{ date }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { tranformDate } from "@/utils/utils";
export default {
  props: {
    course: Object
  },
  data() {
    return {
      date: ""
    };
  },
  created() {
    this.date = tranformDate(this.course.startDay, this.course.endDay);
  },
  methods: {
    jumpToDetail() {
      this.$router.push({ name: "course", params: { id: this.course.id } });
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 0 5px;
  margin: 1rem;
}

.card > header {
  height: 10rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("../assets/home-bg.jpg");
}

.card:hover {
  transform: scale(1.01);
}

.card-body > p {
  word-wrap: break-word;
  word-break: normal;
  margin: 0.5rem;
  height: 3rem;
}

.title {
  font-size: 1.5rem;
}

.content {
  font-size: 1rem;
}

.footer {
  padding-bottom: 0.5rem;
}

.footer > p {
  margin: 0.5rem;
}
</style>
