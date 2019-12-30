<template>
    <div :class="$style.container" ref="container">
        <div :class="$style.homeSever">
            <el-carousel height="480px" indicator-position="outside">
                <el-carousel-item v-for="imgUrl in bannerImgList" :key="imgUrl">
                    <img :class="$style.bannerImg" :src="imgUrl" />
                </el-carousel-item>
            </el-carousel>
            <div :class="$style.homeMainBg">
                <div :class="$style.homeMain">
                    <div :class="$style.homeMainTitle">
                        <ul :class="$style.homeBook">
                            <li
                                v-for="(item, index) in navList"
                                :class="{ [$style.active]: selected == index }"
                                :key="index"
                                @click="changeItemActive(item, index)"
                            >
                                <img
                                    :class="[$style.myIconBook, $style.left]"
                                    :src="item.imgUrl"
                                />{{ item.text }}
                            </li>
                        </ul>
                        <div
                            :class="$style.button"
                            v-if="navList[selected]"
                            @click="checkMoreMsg(selected)"
                        >
                            更多>
                        </div>
                    </div>
                    <div :class="$style.homeMainBody">
                        <div :class="$style.bodyLastNew">
                            <div v-if="navList[selected]" :class="$style.tiem">
                                <div v-for="(item, index) in navList[selected].news" v-if="index ==1" :key="index">
                                    <div :class="$style.homeNav">
                                        {{
                                            item.pubdate | filterDay
                                        }}
                                    </div>
                                    <p :class="$style.homeYear">
                                        {{
                                            item.pubdate | filterYearMonth
                                        }}
                                    </p>
                                </div>
                            </div>
                            <div :class="$style.newellipsis">
                               <template v-if="navList[selected].news &&navList[selected].news.length>0">
                                    <div
                                        :class="$style.lastNewDesc"
                                        v-for="(item, index) in navList[
                                            selected
                                        ].news"
                                        v-if="index ==0"
                                        :key="index"
                                    >
                                        <div :class="$style.newTitle" :title="item.title" @click="details(selected,item)">
                                            {{ item.title }}
                                        </div>
                                        <div
                                            :class="$style.newDecs"
                                            v-html="item.content"
                                        ></div>
                                    </div>
                               </template>
                                <div
                                    v-else
                                    :class="$style.noData"
                                >
                                    暂无数据
                                </div>
                            </div>
                        </div>
                        <ul
                            :class="$style.bodyNews"
                            v-if="navList[selected].news && navList[selected].news.length>0">
                            <li
                                :class="$style.newsItem"
                                v-for="(newItem, index) in navList[selected]
                                    .news"
                                v-if="index < 6&&index > 0"
                                :key="index"
                            >
                                <div :class="$style.main">
                                    <i :class="$style.circle"></i>
                                    <div :class="$style.desc" :title="newItem.title" @click="details(selected,newItem)">
                                        {{ newItem.title }}
                                    </div>
                                </div>
                                <div :class="$style.time" :title="newItem.pubdate | timeFilter">
                                    {{ newItem.pubdate | timeFilter }}
                                </div>
                            </li>
                        </ul>
                        <div :class="$style.noData" v-else>暂无数据</div>
                    </div>
                </div>
            </div>
            <div :class="$style.homeContionBg">
                <div :class="$style.homeContion">
                    <div
                        :class="[
                            $style.homeMap,
                            { [$style.active]: activeIndex === index }
                        ]"
                        v-for="(item, index) in contionList"
                        :key="index"
                        @click="changeIndex(index)"
                    >
                        <div :class="$style.contion">
                            <img
                                :class="$style.myIconContion"
                                :src="item.imgUrl"
                                alt=""
                            />
                            <img
                                :class="$style.myIconContionActive"
                                :src="item.activeImgUrl"
                                alt=""
                            />
                            <h4>{{ item.title }}</h4>
                            <p :class="$style.resource">{{ item.decs }}</p>
                            <p
                                :key="subIndex"
                                v-for="(text, subIndex) in item.descs"
                            >
                                {{ text }}
                            </p>
                            <i :class="$style.myIconEllipsis"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog append-to-body :visible.sync="dialogFormVisible_password" class="dialog" width="800px" 
          :close-on-click-modal="false" :close-on-press-escape="false">
          <div class="dialog-title" slot="title">
            <i class="zicon zicon-xiangqing" style="color:#555555;font-size:16px;line-height: 20px;"></i>&nbsp;规范详情
          </div>
          <h4>{{itemData.title}}</h4>
          <div :class="$style.source">
            <span>发布单位：{{itemData.pubunit}}</span>
            <span>发布时间:{{itemData.pubdate | timeFilter }}</span>
          </div>
          <div :class="$style.source">
            <span>来源：{{itemData.source}}</span>
            <span v-if="itemData.setName">下载次数 ：{{itemData.getnum}}</span>
            <span>浏览次数 ：{{itemData.viewnum}}</span>
          </div>
          <p style="border-bottom: 1px solid #ebebeb;">
            <div :class="$style.introduce" v-html="itemData.content"></div>
            <div slot="footer" class="dialog-footer">
              <el-button v-if="itemData.setName" style="margin-top: 30px;" class="primary" size="mini" @click="clickDownload()">下载</el-button>
              <!-- <el-button type="primary" @click="UpdateUserPassword()" size="small">确 定</el-button>  -->
            </div>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data() {
        return {
            dialogFormVisible_password: false,
            itemData: {
                abstract: " ",
                content: " ",
                getnum: " ",
                id: " ",
                inuse: " ",
                ispublic: 1,
                keyword: " ",
                lastID: " ",
                lastTime: " ",
                oldName: " ",
                pubdate: " ",
                pubunit: " ",
                remarks: " ",
                setName: " ",
                source: " ",
                title: " ",
                type: " ",
                typeId: " ",
                version: " ",
                viewnum: " "
            },
            contionList: [
                {
                    imgUrl: '/static/img/Remote.png',
                    activeImgUrl: '/static/img/Remotess.png',
                    title: '卫星遥感资源大厅',
                    descs: [
                        '卫星遥感资源大厅的具体描述',
                        '卫星遥感资源大厅的具体描述'
                    ],
                    decs: 'satellite Remote Sensing Resources'
                },
                {
                    imgUrl: '/static/img/special.png',
                    activeImgUrl: '/static/img/Remobg .png',
                    title: '地质专题产品',
                    descs: ['地质专题产品的具体描述', '地质专题产品的具体描述'],
                    decs: 'Special geological products'
                },
                {
                    imgUrl: '/static/img/Achievements.png ',
                    activeImgUrl: '/static/img/Examination.png',
                    title: '地质成果数据',
                    descs: ['地质成果数据的具体描述', '地质成果数据的具体描述'],
                    decs: 'Geological data'
                },
                {
                    imgUrl: '/static/img/archives.png',
                    title: '地质档案',
                    activeImgUrl: '/static/img/archivesgg.png',
                    descs: [
                        '地质档案的具体描述',
                        'Geological Archives的具体描述'
                    ],
                    decs: 'Geological Archives'
                }
            ],
            bannerImgList: ['/static/img/block.png', '/static/img/block1.png'],
            activeIndex: -1,
            selected: 0,
            navList: [
                {
                    text: '技术规范',
                    imgUrl: '/static/img/book.png',
                    news: [{ abstract: '', title: '', pubdate: '' }]
                },
                {
                    text: '政策法规',
                    imgUrl: '/static/img/policy.png',
                    news: [{ abstract: '', title: '', pubdate: '' }]
                }
            ]
        }
    },
 
 
    mounted() {
        this.$nextTick(() => {
            this.getTechData()
        })
    },
    methods: {
        clickDownload(){
            let id=this.itemData.id
            let $eleForm = $("<form method='post'></form>")
            if(this.selected==0){
                $eleForm.attr('action', this.api + '/TYwTechnicalnorm/DownloadFiles?id=' + id)
                $(document.body).append($eleForm)
                //提交表单，实现下载
                $eleForm.submit()
            }
            else if(this.selected==1){
                $eleForm.attr('action', this.api + '/TYwPolicylaw/DownloadFiles?id=' + id)
                $(document.body).append($eleForm)
                //提交表单，实现下载
                $eleForm.submit()
            }
            
        },
        details(index,row) {
            var _this=this;
            this.dialogFormVisible_password = true
            let queryrow={
                Keyid:''
            };
            queryrow.Keyid=row.id;
            if(index==0)
            {
                _this.$axios
                .get('/TYwTechnicalnorm/Query', {
                params: queryrow
                })
                .then(res => {
                _this.itemData=res.data[0];
                })
            }
            else if(index==1){ 
                _this.$axios
                .get('/TYwPolicylaw/Query', {
                params: queryrow
                })
                .then(res => {
                _this.itemData=res.data[0];
                })
            }
        },
        getTechData() {
            if (this.selected == 0) {
                this.$axios
                    .get('/TYwTechnicalnorm/HomePageQuery', {
                        params: { page: 1, pageSize: 7 }
                    })
                    .then(res => {
                        this.navList[this.selected].news = res.data.data
                    })
            }
        },
        checkMoreMsg(val) {
            if (val == 0) {
                this.$router.push('/technical')
            } else {
                this.$router.push('/rule')
            }
        },
        changeIndex(index) {
            if (index == 0) {
                this.$router.push('/raster')
            } else if (index == 1) {
                this.$router.push('/special')
            } else if (index == 2) {
                this.$router.push('/data')
            } else {
                this.$router.push('/dossier')
            }
            this.activeIndex = index
        },
        changeItemActive(item, index) {
            if (index == 0) {
                this.getTechData()
            } else {
                this.$nextTick(() => {
                    this.$axios
                        .get('/TYwPolicylaw/HomePageQuery', {
                            params: { page: 1, pageSize: 7 }
                        })
                        .then(res => {
                            this.navList[this.selected].news = res.data.data
                        })
                })
            }
            this.selected = index
            this.navList.forEach(item => {
                item.isActive = false
            })
            item.isActive = !item.isActive
        }
    },
    computed: {
        showdetailList: {
            get: function() {
                let newArr = []
                for (var i = 0; i < 6; i++) {
                    // console.log('数据', this.navList[this.selected].news[i])
                    let item = this.navList[this.selected].news[i]
                    newArr.push(item)
                }
                return newArr
            }
        }
    },
       filters: {
        filterTime(val) {
            return moment(val).format('YYYY-MM-DD')
        },
        filterYearMonth(val) {
            return moment(val).format('YYYY-MM')
        },
        filterDay(val) {
            return moment(val).format('DD')
        }
    },
}
</script>
<style module lang="less">
@import './index.less';
</style>
