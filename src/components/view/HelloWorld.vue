<template>
	<vueUeditor></vueUeditor>
</template>

<script>
	import vueUeditor from './../model/umeditor'

	export default {
		data() {
			return {
				dialogVisible: false,
				 formItem: {
                    input: '',
                    select: [],
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
			}
		},
		  metaInfo: {
    title: '地质共享大数据',
  },
		components: {
			vueUeditor
		},
		methods: {
			getContent(){
				// console.log(this.$refs.eidtors.getText())

			},changeTag(text){
				if(this.formItem.select.length==6){
					this.formItem.select.splice(5,1)
				}
			}
		},
		watch: {

		},
		created() {

		},
		mounted() {

		},
		destoryed() {

		}
	}
</script>


<style scoped>
	.p-30{padding: 30px;}
</style>
