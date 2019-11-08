import {mapGetters,mapMutations} from 'vuex'
import { getBottomInfors } from 'api'
export default {
  computed:{
    ...mapGetters({
      bottomInfors:'getBottomInfors' // 读取vuex中的底部信息
    })
  },
  methods:{
    ...mapMutations({
      setBottomInfors:'changeBottomInfors' // 设置vuex中的底部信息
    }),
    async initialBottomInfors(){ // 初始vuex的底部信息
      this.setBottomInfors(await getBottomInfors())
    }
  }
}
