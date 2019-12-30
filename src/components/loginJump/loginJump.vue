<template>
</template>
<script>
import { initRoute } from '@/utils/router'
import { getToken, setToken, removeToken, setUserInfo } from '@/utils/auth'
export default {
    mounted(){
        this.$nextTick(() => {
            this.$route.query.menuid
            // console.log(this.$route.query.menuid);
            this.$route.query.token
            // console.log(this.$route.query.token);
            //通过后台接口验证token 通过跳转到相应页面，失败跳转到home页面
            this.$axios
                .get('/SystemMenu/ReturnSsoPage',{
                    params: {
                        token:this.$route.query.token,
                        menuid:this.$route.query.menuid
                    }
                })
                .then(res => {
                    if(res.code==1)
                    {
                        if(res.data.functionTree.length==0){
                            this.$router.push('/homePage')
                        }
                        else{
                            const data = res.data
                            this.$store.commit('SET_TOKEN',data.token);
                            setUserInfo(data);
                            setToken(data.token);
                            this.$nextTick(function(){
                                initRoute(data.functionTree, this.$router);
                                this.$router.push(data.systemMenuDto.menuUrl);
                            })
                        }
                    }
                    else{
                        this.$router.push('/homePage')
                    }
                })

        });
    },
}
</script>
