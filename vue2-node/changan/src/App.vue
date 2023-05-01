<template>
  <div id="app" class="bg-black text-slate-500">
    <h1 class="text-center">《长安十二时辰》- 望楼传信系统（二进制）</h1>
    <h2 class="flex justify-center items-end">
      <span class="text" v-for="(item, index) in chars" :key="item">{{ item + (index < 10 ? '0' + index : index) }}</span>
    </h2>
    <div class="light flex justify-center items-center">
      <span class="box" v-for="(n, i) in lights" :key="i" @click="$set(lights, i, 1 - n)" :class="{ active: n }">
        {{ n }}
      </span>
    </div>
    <button class="btn" @click="random">随机生成</button>
    <h3 class="text-center text-slate-300 info">{{ update + ' - ' + randomChar(update) }}</h3>
    <div class="sentence">{{ sentenceAll }}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      lights: Array(4).fill(0),
      chars: '张都尉 携 狼 虎 卯时 一刻 两刻 入 出 东市 西市 平康 怀远 永宁 皇城 饮恨'.split(' '),
      update: 0,
      sentence: [],
    }
  },
  created() { },
  mounted() { },
  methods: {
    random: function () {
      this.update = Math.floor(Math.random() * 16);
      if (this.sentence.length < 6) this.sentence.splice(this.sentence.length, 0, this.chars[this.update]);
      else this.sentence = [this.chars[this.update]];
      let old = this.update.toString(2);
      let newNum = old.length < 4 ? Array(4 - old.length).fill(0).join('') + old : old;
      this.lights = newNum.split('').map(i => Number(i));
    },
    randomChar: function (index) {
      return this.chars[index];
    }
  },
  computed: {
    num() {
      return parseInt(this.lights.join(''), 2)
    },
    char() {
      return this.chars[this.num]
    },
    sentenceAll() {
      return '"' + this.sentence.join(' ') + '"';
    }
  }
}
</script>
<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  color: #ecc;
  font-family: 'Kaiti';
}

#app>h2 {
  font-size: 1.5rem;
}

#app>h2>.text {
  display: inline-block;
  width: 2rem;
  margin: 0.7rem;
}

#app>h1 {
  font-size: 3rem;
  padding: 2rem;
}

.box {
  width: 5rem;
  height: 5rem;
  font-size: 2.5rem;
  background-color: #333;
  margin: 2.5rem 1.5rem;
  border-radius: 10px;
  line-height: 5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
}

.active {
  background-color: #ecc;
  color: black;
}

.info {
  font-size: 2rem;
}

.btn {
  font-size: 2rem;
  background-color: #666;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.5s;
  margin: 1rem auto;
  display: block;
}

.btn:hover {
  background-color: #fff;
  color: #e55;
}

.sentence {
  text-align: center;
  margin: 0 auto;
  font-size: 2rem;
}
</style>
