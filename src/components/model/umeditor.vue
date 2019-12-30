<template>
  <script :id="randomId" name="content" type="text/plain" style="width: 100%;" :style="{'height': h}" ></script>
</template>

<script>
	import '../../../static/ueditor1_4_3_3/ueditor.config.js'
	import '../../../static/ueditor1_4_3_3/ueditor.parse.min.js'
	import '../../../static/ueditor1_4_3_3/ueditor.all.js'
	import '../../../static/ueditor1_4_3_3/lang/zh-cn/zh-cn.js'
export default {
  name: 'VueUEditor',
  props: {
    ueditorPath: {
      // UEditor 代码的路径
      type: String,
      default: '/static/ueditor1_4_3_3/'
    },
    ueditorConfig: {
      // UEditor 配置项
      type: Object,
      default: function () {
        return {
        	scaleEnabled:true
        };
      }
    },
    h:{
    	type: String,
    	default:"500px"
    }
  },
  data () {
    return {
      // 为了避免麻烦，每个编辑器实例都用不同的 id
      randomId: 'editor_' + (Math.random() * 100000000000000000),
      instance: null,
      // scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
      scriptTagStatus: 0
    };
  },
  created () {
    if (window.UE !== undefined) {
      // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
      this.scriptTagStatus = 2;
      this.initEditor();
    } else {
      // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
      this.insertScriptTag();
    }
  },
  beforeDestroy () {
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy();
    }
  },
  methods: {
    insertScriptTag () {
      let editorScriptTag = document.getElementById('editorScriptTag');
      let configScriptTag = document.getElementById('configScriptTag');

      // 如果这个tag不存在，则生成相关代码tag以加载代码
      if (editorScriptTag === null) {
        configScriptTag = document.createElement('script');
        configScriptTag.type = 'text/javascript'; configScriptTag.src = this.ueditorPath + 'ueditor.config.js'; configScriptTag.id = 'configScriptTag';

        editorScriptTag = document.createElement('script');
        editorScriptTag.type = 'text/javascript'; editorScriptTag.src = this.ueditorPath + 'ueditor.all.js'; editorScriptTag.id = 'editorScriptTag';
        let s = document.getElementsByTagName('head')[0];
        s.appendChild(configScriptTag);
        s.appendChild(editorScriptTag);
      }

      // 等待代码加载完成后初始化编辑器
      if (configScriptTag.loaded) {
        this.scriptTagStatus++;
      } else {
        configScriptTag.addEventListener('load', () => {
          this.scriptTagStatus++;
          configScriptTag.loaded = true;
          this.initEditor();
        });
      }

      if (editorScriptTag.loaded) {
        this.scriptTagStatus++;
      } else {
        editorScriptTag.addEventListener('load', () => {
          this.scriptTagStatus++;
          editorScriptTag.loaded = true;
          this.initEditor();
        });
      }

      this.initEditor();
    },
    initEditor () {
      // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
      if (this.scriptTagStatus === 2 && this.instance === null) {
        // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
        // 所以，我们只能在 nextTick 里面初始化 UEditor
        this.$nextTick(() => {
          this.instance = window.UE.getEditor(this.randomId, this.ueditorConfig);
          // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
          this.instance.addListener('ready', () => {
            this.$emit('ready', this.instance);
          });
        });
      }
    }
    ,isFocus(e){
        alert(this.instance.isFocus());
        this.instance.dom.domUtils.preventDefault(e)
    }
    ,setblur(e){
        this.instance.blur();
        this.instance.dom.domUtils.preventDefault(e)
    }
    ,insertHtml(value) {//追加html代码到光标处
        this.instance.execCommand('insertHtml', value)
    }
    ,createEditor() {
        this.enableBtn();
        this.instance=window.UE.getEditor(this.randomId, this.ueditorConfig);;
    }
    ,getAllHtml() {
        alert(this.instance.getAllHtml())
    }
    ,getContent() {
        var arr = [];
        arr.push(this.instance.getContent());
        // console.log(this.instance.getContent())
				// this.$parent.querydata(arr.join("\n"));
				this.$emit('query', arr.join("\n"));
        return (arr.join("\n"));
    }
    ,getPlainTxt() {
        var arr = [];
        arr.push(this.instance.getPlainTxt());
        return (arr.join('\n'))
    }
    ,setContent(isAppendTo) {
        var arr = [];
//      arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
        this.instance.setContent(isAppendTo);
        return (arr.join("\n"));
    }
    ,setDisabled() {
        this.instance.setDisabled('fullscreen');
        this.disableBtn("enable");
    }

    ,setEnabled() {
        this.instance.setEnabled();
        this.enableBtn();
    }

    ,getText() {
    		//获取鼠标选中的内容
        //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
        var range = this.instance.selection.getRange();
        range.select();
        var txt = this.instance.selection.getText();
        return txt
    }

    ,getContentTxt() {
        var arr = [];
//      arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
//      arr.push("编辑器的纯文本内容为：");
        arr.push(this.instance.getContentTxt());
        return (arr.join("\n"));
    }
    ,hasContent() {
        var arr = [];
//      arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
//      arr.push("判断结果为：");
        arr.push(this.instance.hasContents());
        return (arr.join("\n"));
    }
    ,setFocus() {
        this.instance.focus();
    }
    ,deleteEditor() {
        disableBtn();
        this.instance.destroy();
    }
    ,disableBtn(str) {
        var div = document.getElementById('btns');
        var btns = this.instance.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            if (btn.id == str) {
                this.instance.dom.domUtils.removeAttributes(btn, ["disabled"]);
            } else {
                btn.setAttribute("disabled", "true");
            }
        }
    }
    ,enableBtn() {
        var div = document.getElementById('btns');
        var btns = this.instance.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            this.instance.dom.domUtils.removeAttributes(btn, ["disabled"]);
        }
    }

    ,getLocalData () {
        return this.instance.execCommand( "getlocaldata" );
    }

    ,clearLocalData () {
        this.instance.execCommand( "clearlocaldata" );
        return "已清空草稿箱"
    }
  }
};
</script>
<style>
/* .edui-popup-content.edui-default{ height: auto !important; } */
	.edui-editor-iframeholder{
        height: 470px !important;
  }
	#edui_fixedlayer{
		position: fixed;
    left: 0px;
    top: 0px;
    width: 0px;
    height: 0px;
    z-index: 20001 !important;
	}
	.edui-default .edui-colorpicker-nocolor{
		height: 20px!important;
	}
</style>
