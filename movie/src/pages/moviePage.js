import MovieList from "../components/movieList.js"
import Pager from "../components/pager.js"
import Loading from "../components/loading.js"

const template = `
    <div id="myDiv">
        <MovieList :movies="datas"/>
        <Pager 
        v-model="current"
        :total="total" 
        :page-size="pageSize" 
        />
        <Loading :show="isLoading"/>
    </div>
`
export default {
    template,
    mounted() {
        //远程获取数据
        this.$store.dispatch("movie/fetch"); 
    },
    computed: {
        ...Vuex.mapState("movie", ["pageSize", "datas", "isLoading", "total"]),
        current: {
            get() {
                return this.$store.state.movie.current;
            },
            set(newPage) {
                this.$store.commit("movie/setState", { current: newPage })
                this.$store.dispatch("movie/fetch");
            }
        }
    },
    components: {
        MovieList,
        Pager,
        Loading
    }
}