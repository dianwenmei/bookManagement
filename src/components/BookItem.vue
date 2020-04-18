<template>
  <el-dialog
    :destroy-on-close="true"
    :center="true"
    title="图书详情"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form  ref="bookFormRef" inline :rules="bookFormRules" :model="bookForm" label-width="80px">
      <el-form-item label="图书名" prop="bookName">
        <el-input :disabled="canEdit" maxlength="16" v-model="bookForm.bookName"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="publishing">
        <el-input :disabled="canEdit" maxlength="15" v-model="bookForm.publishing"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input :disabled="canEdit" maxlength="30" v-model="bookForm.author"></el-input>
      </el-form-item>
      <el-form-item label="总数量" prop="total">
        <el-input :disabled="canEdit" maxlength="4" v-model.number="bookForm.total"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="remainingNum">
        <el-input :disabled="canEdit" maxlength="4" v-model.number="bookForm.remainingNum"></el-input>
      </el-form-item>
      <el-form-item label="ISBN" prop="isbn">
        <el-input :disabled="canEdit" maxlength="13" v-model="bookForm.isbn"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input :disabled="canEdit" maxlength="20" v-model="bookForm.type"></el-input>
      </el-form-item>
      <el-form-item label="出版时间" prop="pubdate">
        <el-date-picker value-format="yyyy-MM" format="yyyy-MM" :disabled="canEdit" v-model="bookForm.pubdate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="图书简介" prop="bookInfo">
        <el-input
          class="textinput"
          :autosize="{ minRows: 2, maxRows: 4}"
          type="textarea"
          :rows="2"
          maxlength="500"
          show-word-limit
          :disabled="canEdit"
          v-model="bookForm.bookInfo"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancalButton">取 消</el-button>
      <el-button :disabled="isedited" :loading="loading" type="primary" @click="submitButton">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "BookItem",
  // props: {
  //   book: Object
  // },
  data() {
    var validateISBN = (rule, value, callback) => {
        if (value.length===10 || value.length===13) {
          callback();
          
        }else {
         callback(new Error('ISBN为10位数或13位数'));
        }
      };
    return {
      //是否可以修改，动态渲染
      canEdit: false,
      loading: false,
      //修改次数，默认第一次打开对话框会修改一次，所以当修改第二次时，让按钮正常。
      editNum: 0,
      //是否修改过
      isedited: true,
      //是否显示图书库存，图书编辑中显示，图书添加中不显示
      dialogVisible: false,
      newBook:{},
      bookForm: {
        bookId: '',
        bookName: '',
        publishing: '',
        author: '',
        total: '',
        remainingNum: '',
        isbn: '',
        type: '',
        bookInfo: '',
        pubdate: ''
      },
      //数据验证
      bookFormRules: {
        bookName:[
          {required:true, message:"请输入图书名",trigger:"blur"},
          {max: 16, message: '最多16个字', trigger: 'blur'}

        ],
        publishing:[
          {required:true, message:"请输入出版社名",trigger:"blur"},
          {max: 15, message: '最多15个字', trigger: 'blur'}
        
        ],
        author:[
          {required:true, message:"请输入作者",trigger:"blur"},
          {max: 30, message: '最多30个字', trigger: 'blur'}

        ],
        total:[
          {required:true, message:"请输入图书总数量",trigger:"blur"},
          {type: 'number', message:'只能输入数字'},

        ],
        remainingNum:[
          {required:true, message:"请输入剩余图书数量",trigger:"blur"},
          {type: 'number', message:'只能输入数字'}
        
        ],
        isbn:[
          {required:true, message:"请输入图书ISBN",trigger:"blur"},
          {validator:validateISBN,trigger:'blur'}

        ],
        type:[
          {max: 20, message: '最多20个字', trigger: 'blur'}
        ],
        pubdate:[
      
        ],
        bookInfo:[

        ]
      },

    };
  },
  watch: {
    dialogVisible(val, oldVal) {
      this.dialogVisible = val;
      //console.log(this.dialogVisible);
    },
    bookForm:{
      handler(val, oldVal){
        // this.isedited = true;
        this.editNum = this.editNum+1;  

        if(this.editNum>=2)
          this.isedited = false;
        console.log("数据改变"+ this.editNum);
      },
      deep:true
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.resetForm();
      console.log("关闭")
    },
    cancalButton(){
      this.dialogVisible = false;
      this.resetForm();
    },
    //提交按钮，验证数据有效性，当提交后，交互服务端，且修改前端数据显示
    submitButton(){
      //this.dialogVisible = false;
      /////////////////////////////////////////////////////////////////////////////////////
      //1.验证数据有效性，有效继续，无效返回
      //2.
      //3.服务端返回消息后，修改前端数据，且关掉对话框并进行重置，，
      this.$refs.bookFormRef.validate((valid, daa)=>{
        console.log(valid);

        const _this = this;
        if(valid){
            this.loading = true;

            //调用接口
            this.$http.post('/book/updatebook',this.bookForm).then(function(response){
              const res = response.data;
              console.log(res);
              //调用成功，修改数据，关闭对话框，
              if(res.code==1){
                _this.setNewBook(); //更新前端数据
                _this.dialogVisible=false;
                _this.resetForm();
                

              }else{
                _this.$message.error(res.message);

              }
            }).catch(()=>{
              //调用不成功，改加载
              _this.loading = false;
            })
            

          
        }
      })
      
      //this.resetForm();
    },
    //查看图书详情，查看用户的身份，如果管理员则可以编辑，
    //编辑后，查看是否有变化，如果有变化，则页面先变化，同时发往服务端。
    openDialog(dialogVisible, book) {

      if(window.sessionStorage.getItem('roleId') != 2){
        //普通用户，
        this.canEdit = true;
      };

      this.dialogVisible = dialogVisible;
      //console.log(book);
      this. bookForm.bookId = book.bookId; 
      this.bookForm.bookName = book.bookName;
      this.bookForm.publishing = book.publishing;
      this.bookForm.author = book.author;
      this.bookForm.total = book.total;
      this.bookForm.remainingNum = book.remainingNum;
      this.bookForm.isbn = book.isbn;
      this.bookForm.bookInfo = book.bookInfo;
      this.bookForm.pubdate = book.pubdate;
      this.bookForm.type = book.type;

      this.isedited =true,
      this.newBook = book;
      this.loading = false;
    },
    resetForm(){
      
      //每次关闭后都重置，下次打开时，editNum都是1，当=2时，渲染确定按钮。
      this.bookForm.bookName = '';
      this.bookForm.publishing = '';
      this.bookForm.author = '';
      this.bookForm.total = '';
      this.bookForm.remainingNum = '';
      this.bookForm.isbn = '';
      this.bookForm.bookInfo = '';
      this.bookForm.pubdate = '';
      this.bookForm.type = '';

      //reset时，watch还会执行一次，所以置为-1，关闭后，即为0，每次打开都为1，修改后》=2
      this.editNum=-1;
    },
    setNewBook(){
      this.newBook.bookName = this.bookForm.bookName
      this.newBook.publishing = this.bookForm.publishing
      this.newBook.author = this.bookForm.author
      this.newBook.total = this.bookForm.total
      this.newBook.remainingNum = this.bookForm.remainingNum
      this.newBook.isbn = this.bookForm.isbn
      this.newBook.bookInfo = this.bookForm.bookInfo
      this.newBook.pubdate = this.bookForm.pubdate
      this.newBook.type = this.bookForm.type
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.textinput {
  width: 400px;
}
</style>