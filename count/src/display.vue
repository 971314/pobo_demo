<template>
    <div>
        <h3>Count is {{count}}</h3>
        <!--<p>组件自己的内部计算属性{{loaclComputed}}</p>-->
        <h3>AnoterIncrement is {{countAnother}}</h3>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
//        computed:mapState({//对象
////            count: state => state.count   // 组件内的每一个属性函数都会获得一个默认参数state, 然后通过state 直接获取它的属性更简洁
////            count: 'count'　　　　　　　　　// 'count' 直接映射到state 对象中的count, 它相当于 this.$store.state.count,
//        })
        computed:{
            loaclComputed(){
                return this.count + 10
            },
            ...mapState([//数组
                'count'
            ]),
            countAnother(){
                return this.$store.getters.countAnother;
            }
        }
    }
</script>
<style scoped>
    h3{
        font-size:30px;
    }
</style>