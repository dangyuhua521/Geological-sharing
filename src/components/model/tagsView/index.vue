<template>
	<div class="tags" @click="routeTo($event,Msg.path)">
		<span class="ripple">{{Msg.name}}</span>
		<!--<i class="iconfont icon-close tags-close" @click.stop="closeTags()" v-if="Msg.close==true||Msg.close=='true'"></i>-->
	</div>
</template>
<script>
	export default{
		props:['data','index'],
		data(){
			return{
				Msg:{
					name:'',
					path:''
				}
			}
		},
		methods:{
			closeTags(){
				this.$emit('removeTag',this.index)
			},
			routeTo(el,path){

				this.$parent.TagsAct=this.index;
				this.$nextTick(()=>{
					this.$parent.$parent.$parent.$parent.$refs.menu.actPath=path;			
					this.$router.push(path);
				})
			}
		},
		watch:{
			data(){
				this.Msg=JSON.parse(this.data)
			}
		},
		mounted(){
			this.Msg=JSON.parse(this.data)
		}
	}
</script>
<style scoped="scoped" lang="scss"  rel="stylesheet/scss" >
	$bcolor:#1890ff;
	.tags{
		display: inline-block;
		position: relative;
		white-space: nowrap;
		cursor: pointer;
		margin-right: 25px;
		height: 36px;
		line-height: 30px;
		color: $bcolor;
		padding: 0 5px 0 0px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		-moz-border-radius-topleft:10px ;
		-moz-border-radius-topright:10px ;
		color: #333;
		.ripple {
			border-bottom:2px solid transparent;
		}
	}
	.tags.active{
		color: #fff;
	}
	.ripple::after{
		// display:none;
	}
	.tags.bgx{
		background:transparent!important;
		color: $bcolor;
		.ripple{
			border-color:$bcolor;
		}
	}

	.tags span{	
		vertical-align: middle;
		display: inline-block;
		padding: 3px 0px 0 3px;
		width: 100%;
		box-sizing: border-box;    
		text-align: center;
		height: 100%;
	}
	.tags-close{
		font-size: 10px;
		width: 13px;
		height: 13px;
		display: inline-block;
		vertical-align: middle;
		margin-left: 5px;
		position: absolute;
		right: -12px;
		top: 5px;
		color:#999!important;
	}
	/*.tags-close:hover{
		border-radius: 14px;
		animation-fill-mode : forwards;
		animation:bgColor .2s ;
		background:#C2CCD1;color: #fff;
		-webkit-animation:bgColor .2s ;
	}*/
	@keyframes bgColor
	{
	from {background:$bcolor;color: #333;}
	to {background:#C2CCD1;color: #fff;}
	}
	
	@-webkit-keyframes bgColor
	{
	from {background:$bcolor;color: #333;}
	to {background:#C2CCD1;color: #fff;}
	}
	@-o-keyframes bgColor
	{
	from {background:$bcolor;color: #333;}
	to {background:#C2CCD1;color: #fff;}
	}
	@-moz-keyframes bgColor
	{
	from {background:$bcolor;color: #333;}
	to {background:#C2CCD1;color: #fff;}
	}
</style>