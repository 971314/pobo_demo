<template>
    <div>
        <div>
            <button @click="increment">+1</button>
            <button @click="decremect">-1</button>
        </div>
        <div>
            <input type="text" v-model="incrementValue"/>
            <button @click="incrementWithValue">increment</button>
        </div>
        <div v-if="show">
            waiting
        </div>
    </div>
</template>
<script>
    import {mapActions,mapGetters } from 'vuex'
    export default {
        data(){
            return {
                incrementValue:0
            }
        },
        computed:{
            show(){
                return this.$store.state.awiting;
            },
//            countAnother(){
//                return this.$store.getters.countAnother;
//            }
            ...mapGetters(['countAnother'])
        },
        methods:{
//            increment(){
//                this.$store.dispatch('increment');
//            },
//            decremect(){
//                this.$store.dispatch('decrement');
//            },
            ...mapActions(['increment','decremect']),
            incrementWithValue(){
//                let _this = this;
////                this.$store.dispath('incrementValue',this.incrementValue)
//                try{
//                    _this.$store.dispatch('incrementWithValue',_this.incrementValue);
//                }catch(error){
//                    alert(error);
//                }
                // dispatch 只能接受一个参数，需要传对象参数
                this.$store.dispatch('incrementWithValue',{value:this.incrementValue,anotherValue:this.countAnother})
            }
        }
    }
</script>
<style scoped>
    button{
        width:100px;
        height:100px;
        font-size:30px;
    }
</style>