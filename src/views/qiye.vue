<template>
  <div class="qiye">
    <el-container>
      <el-main>
        <el-form ref="form" :model="form" :rules="rules">
          <el-row>
            <h3>
              企业信息
            </h3>
          </el-row>
          <div class="info">
            <el-row>
              <div class="label">企业名称
              </div>
              <el-form-item prop="name">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <div class="label">单位编号
              </div>
              <el-form-item prop="code">
                <el-input v-model="form.code" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-row>
          </div>
          <el-row>
            <h3>
              个人信息
            </h3>
          </el-row>
          <div class="info">
            <el-row>
              <div class="label">联系人
              </div>
              <el-form-item prop="contacts">
                <el-input v-model="form.contacts" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <div class="label">联系电话
              </div>
              <el-row>
                <el-form-item prop="telephone">
                  <el-input v-model="form.telephone" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-row>
            </el-row>
            <!--<el-row>-->
            <!--<div class="label">验证码-->
            <!--</div>-->
            <!--<el-row>-->
            <!--<el-col :span="8">-->
            <!--<el-form-item>-->
            <!--<el-input v-model="form.vcode" placeholder="请输入内容"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</el-row>-->
          </div>
          <div class="button">
            <el-button style="width:100%" type="primary" @click="submit()">提交</el-button>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
  import {Prop, Component, Vue, Model} from 'vue-property-decorator';

  @Component
  export default class qiye extends Vue {

    form = {
      name: '',
      code: '',
      telephone: '',
      vcode: '',
      contacts: '',

    }
    openId=''
    rules = {
      name: [
        {required: true, message: '请输入企业名称', trigger: 'blur'},
      ],
      code: [
        {required: true, message: '请输入单位编号', trigger: 'blur'},
      ],
      telephone: [
        {required: true, message: '请输入联系电话', trigger: 'blur'},
      ],
      vcode: [
        {required: true, message: '请输入内容', trigger: 'blur'},
      ],
      contacts: [
        {required: true, message: '请输入联系人', trigger: 'blur'},
      ],
    }

    submit() {
      const form = this.form
      const openId = this.openId;
      this.$refs['form'].validate((val) => {
        if (val) {
          this.$http.post(`/api/add.ashx`, {
            "openId": openId,
            "enterpriseName": form.name,
            "organizationCode": form.code,
            "ContactsName": form.contacts,
            "ContactsTel": form.telephone,
          }, {emulateJSON: true}).then((value => {
            const str1 = value["bodyText"]
            var a={
              code:"20dee",
                body:"100"
            }
            console.log(JSON.stringify(a))
            console.log(value)
            console.log(str1)
            const str=JSON.parse(str1)

            if (str["code"] == 200) {
              this.$message({
                showClose: true,
                message:str["body"],
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: str["body"],
                type: 'warning'
              });
            }

          }), (value => {

          }));

        }

      })

    }
    mounted(){
      var it=this
      const code = this.$route.query["code"]
      var url=`/api/getOpenId.ashx?code=${code}`
      // var url=`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx5c8041bcdd5599bb&secret=277a5c0d8fc0cb1cfe855cea56ba98ef&code=${code}&grant_type=authorization_code`
      this.$http.get(url).then((response => {
        it.openId= response.body["openid"]
      }), (response => {
      }));
    }

    verification() {
      let token = "15_AXI_6CwSoXCnxaXvt1TNq-B1oVqQFjNqHc2O_W9LzbQsjtKn71F3mWRdJxEphxAGGv5P0KzSGBzUKNQvuPzEc4_DEZxMQibyQRpNFJh6f1L3xj5nPfNQH9BUNixKwkx7GjyymRNbY69XTHNyPNSfAGASQV"
      this.$http.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`, {
        "touser": "oeJ4T5l3CoJeyzJNv80cpwZMi7xM",
        "template_id": "EPw47eS2WcM7KDW4vTLuUkEmILK_isUFbxKFNekDIF8",
        "url": "http://weixin.qq.com/download",
        "data": {
          "first": {
            "value": "恭喜你购买成功！",
            "color": "#173177"
          },

        }
      }, {emulateJSON: false}).then((value => {
        console.log(value)
      }), (value => {
      }));
    }
  }
</script>

<style scoped lang="stylus">
  .info
    margin-left: 10px

  .label
    padding: 0.5rem 0px

  .button
    text-align center
</style>
