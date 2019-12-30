<template>
    <el-dialog
        append-to-body
        :visible.sync="visible"
        :width="width"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="onClose"
    >
        <template slot="title">
            {{ title }}
        </template>
        <MiniContent :options="options" v-if="type === 'mini'" />
        <SmallContent :options="options" v-if="type === 'small'" />
        <MediumContent :options="options" v-if="type === 'medium'" />
        <div style="padding-top:10px;">
            <el-row>
                <el-col :span="24" style="text-align:left;height: 10px;">
                    <el-button
                        class="result-li color-primary"
                        v-if="visible_cart"
                        @click="cart()"
                        ><i class="my-icon-Collection"></i>数据收藏</el-button
                    >
                    <el-button
                        class="result-li color-warning"
                        v-if="visible_shopping"
                        @click="shopping"
                        ><i class="my-icon-shopCart"></i>加入购物车</el-button
                    >
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>
<script>
import MiniContent from './mini'
import SmallContent from './small'
import MediumContent from './medium'
import { getToken } from '@/utils/auth'
export default {
    components: {
        MiniContent,
        SmallContent,
        MediumContent
    },
    props: {
        width: {
            type: String,
            default: '1000px'
        },
        visible: {
            type: Boolean,
            required: true
        },
        title: String,
        type: {
            type: String,
            //   medium / small / mini
            default: 'mini'
        },
        options: {
            type: Object,
            required: true,
            default: {
                imgUrl: '',
                data: {}
            }
        },
        visible_cart: false,
        visible_shopping: false,
        Datdid: "",
        DataName: "",
        Datatype: "",
        DepId: "",
    },
    methods: {
       
         routeNav(path) {
      this.$router.push(path)
    //   document.getElementById("target").scrollIntoView();
    },
        onClose() {
            this.$emit('update:visible', false)
        },
        cart(data) {
            var _this = this
            if (!getToken()) {
                this.$notify({
                    message: '请登录',
                    type: 'error',
                    offset: 100,
                })
                return
            }
            var _data = [];
                _data.push({
                    Datdid: this.Datdid,
                    DataName: this.DataName,
                    Datatype: this.Datatype,
                    DepId: this.DepId
                })
            this.$axios
                .post('/TYwDatacollection/SaveDataList', _data)
                .then(res => {
                    //是否操作成功判断
                   const h =this.$createElement;
                    this.instance=this.$notify({
                    message:h('a',{
                        on:{
                            click:this.onClick_myCollection
                        }
                    },'成功加入收藏，点击前往'),
                    type: 'success',
                    offset: 100,
                    })
                })
        },
        shopping(data) {
            let _this = this;
           if (!getToken()) {
                this.$notify({
                    message: '请登录',
                    type: 'error',
                    offset: 100,
                })
                return
            }
            var _data = [];
                _data.push({
                    Datdid: this.Datdid,
                    DataName: this.DataName,
                    Datatype: this.Datatype,
                    DepId: this.DepId
                })
            this.$axios
                .post('/TYwDatashoping/SaveDataList', _data)
                .then(res => {
                    const h =this.$createElement;
                    this.instance=this.$notify({
                    message:h('a',{
                        on:{
                            click:this.onClick_shopping
                        }
                    },'成功加入购物车，点击前往'),
                    type: 'success',
                    offset: 100,
                    })
                })
        },
        onClick_myCollection(){
              this.$router.push('/personalCenter/myCollection')
        },
        onClick_shopping(){
              this.$router.push('/personalCenter/shopping')
        },
        onClick() {
            this.onClose()
        }
    }
}
</script>


<style scoped lang="less">
.result-li {
    height: 23px;
    padding: 0px 6px;
    margin-bottom: 5px;

    i {
        margin-right: 5px;
        vertical-align: sub;
    }

    &.color-primary {
        color: #666666;
    }

    &.color-warning {
        color: #666666;
    }
}
.my-icon-Collection {
    background: url('/static/img/Collections.png') no-repeat;
    width: 16px;
    height: 15px;
    display: inline-block;
}

.my-icon-shopCart {
    background: url('/static/img/shopCart.png') no-repeat;
    width: 16px;
    height: 15px;
    display: inline-block;
}

</style>