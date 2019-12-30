<template>
	<div>
		<div class="tagsBox" id="TagsBox">
			<template  v-if="showTags">
				<tags-view :data="item" :index="i"  v-for="(item,i) in tagsList" :key="i" v-on:removeTag="removeTags" :class="{'bgx':TagsAct==i}"></tags-view>
			</template>
		</div>
		<div class="btn-box">
			<div class="prevbtn" @click="scrollPrev()" v-show="showPrev">
				<i class="iconfont icon-left"></i>
			</div>
			<div class="nextbtn" v-if="isScroll" @click="scrollEnd()" v-show="showNext">
				<i class="iconfont icon-right"></i>
			</div>
		</div>
		
	</div>
	
</template>

<script>
	import tagsView from './tagsView'
	export default{
		data(){
			return{
				isScroll:false,
				tabIndex:0,
				actIndex:0,
				maxIndex:0,
				scrollWidth:0,
				tagsList:[],
				showNext:false,
				showPrev:false,
				TagsAct:0,
				showTags:true
			}
		},
		methods:{
			scrollEnd(){
				
				if(this.actIndex<(this.maxIndex-1)){
					this.actIndex++
					if(this.actIndex==(this.maxIndex-1)){
						$('.nextbtn').css({'color':'#ccc'})	
						$('.prevbtn').css({'color':'#333'});
					}
				}else{
					return;
				}
				var width=document.getElementById('TagsBox').offsetWidth+10;
				document.getElementById('TagsBox').scrollTo(width*this.actIndex,0)
				
			},
			removeTags(index){
				if(this.tagsList.length==1){
					return;
				}
				// console.log(this.tagsList)

				this.tagsList.splice(index,1);

				if(this.TagsAct==index){
					if(index>0){
						this.TagsAct=index-1
					}else{
						this.TagsAct==0
					}
				}else if(this.TagsAct>index){
					this.TagsAct=this.TagsAct - 1;
				}else{
					
				}

				// console.log(this.tagsList)
				let msg=JSON.parse(this.tagsList[this.TagsAct])
				this.routeTo(msg.path);

			},
			routeTo(path){
				this.$parent.$parent.$parent.$refs.menu.actPath=path;			
				this.$router.push(path);
			},
			scrollPrev(){
				if(this.actIndex>0){
					this.actIndex--
					if(this.actIndex==0){
						$('.prevbtn').css({'color':'#ccc'});
						$('.nextbtn').css({'color':'#333'})	
					}
				}else{
					return;
				}
				var width=document.getElementById('TagsBox').offsetWidth+10;
				document.getElementById('TagsBox').scrollTo(width*this.actIndex,0)
				
			},
			intScroll(){
				let TagsBox=document.getElementById('TagsBox');
				this.scrollWidth=TagsBox.scrollWidth;
				if(TagsBox.scrollWidth>TagsBox.offsetWidth){
					this.isScroll=true;
					this.showNext=true;
					this.showPrev=true;
//					$('.prevbtn').css({'color':'#ccc'});
//					$('.nextbtn').css({'color':'#333'})	
					this.maxIndex=Math.ceil(TagsBox.scrollWidth/(TagsBox.offsetWidth+10))
					// console.log(this.maxIndex)
				}else{
					this.isScroll=false;
					this.showNext=false;
					this.showPrev=false;
				}
				if(TagsBox.offsetLeft==0){
					$('.prevbtn').css({'color':'#ccc'});
				}else{
					$('.prevbtn').css({'color':'#333'});
				}
			}
		},
		watch:{
			tagsList(val){
				this.showTags=false;
				this.index=val.length-1;
				this.showTags=true;

				this.$nextTick(()=>{
					this.intScroll()
				})

			},
			TagsAct(val){

			}
		},
		created(){
			
		},
		components:{
			tagsView
		},
		mounted(){
			
			this.$nextTick(()=>{
				this.intScroll()
				
			})
		},
		destoryed(){
			
		}
	}
</script>

<style scoped="scoped">
	.tagsBox{
		padding: 0px 5px 0;
		display: block;
		width: calc(100% - 80px);
		overflow: hidden;
		white-space: nowrap;
		margin-left: 30px;
	}
	.btn-box{
		position: absolute;
		right: 0;
		top: 0;
		width: 50px;
		height: 35px;
		box-shadow: 0 0 0 #000;
	}
	.prevbtn,.nextbtn{
		display: inline-block;
		height: 50px;
		font-size: 12px;
		position: absolute;
		right: 30px;
		top: 0px;
		line-height: 35px;
		cursor: pointer;
		color: #ccc;
	}
	.nextbtn{
		color: #333;
		right: 0;
	}
</style>