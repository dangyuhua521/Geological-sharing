<template>
    <publicContentDialog
      :visible.sync="punlicContentDialogVisible"
      :type="info_type"
      :options="options"
    ></publicContentDialog>
</template>
<script>
import publicContentDialog from '@/components/publicContentInfoDialog'
import config from '../userManager/orderManagement/config'
import { getdetails,QueryDataInfo } from '@/api/system/options.js'
import { dealOptions } from '@/components/public/common'
export default {
    components:{
        publicContentDialog
    },
    data(){
        return{
          punlicContentDialogVisible:true,
            options: {
                data: [
                    {
                        name: '卫星',
                        content: '测试'
                    },
                    {
                        name: '传感器',
                        content: '测试'
                    }
                ]
            },
            info_type: '' //详情页面类型 mini（遥感） medium（专题产品、成果）
        }
    },
    mounted(){
        this.$route.query.id
        // console.log();
        this.$route.query.type
        // console.log(this.$route.query.type);
        this.information(this.$route.query.id,this.$route.query.type)
    },
      computed: {
    
    pathConfig() {
      return config["satelliteRemote"]
    },
    currentPageLastPath() {
      return this.$route.path.split('/').pop()
    },
    currentPageTitle() {
      return this.$route.name
    }
  },
  methods:{
    //详情
    information(id,type) {
        if (type == 'raster') {
                this.info_type = 'mini'
                getdetails({ id: id, type: type })
                    .then(res => {
                        this.options = dealOptions(type, res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                this.info_type = 'medium'
                QueryDataInfo({ id: id, type: type })
                    .then(res => {
                        this.options = dealOptions(type, res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
    },
  }

}
</script>
