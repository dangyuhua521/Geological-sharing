<template>
    <div >
         <el-aside width="200px"> 
            <main-menu  ref="menu" style="width:200px;padding: 20px"></main-menu>
                
            </el-aside>
    </div>
</template>
<script>
import mainMenu from '@/components/home/mainMenu'
export default {
    data() {
        return {
          
        }
    },
    components:{
        mainMenu
    },
    

   mounted(){
       document.getElementById("target").scrollIntoView();
      
      
    },
}
</script>
