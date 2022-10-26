new Vue({
  el: '#app',
  data() {
    return {
      username: '',
      password: '',
      isroot: false,
      data: '',
    };
  },
  methods: {
    Login() {
      console.log(11);
      if (this.username === '' || !this.password === '') {
        this.$message.error('账号或密码不要为空！');
        return;
      }
      if (this.isroot === true) {
        var data = new URLSearchParams();
        data.append('rootname', this.username);
        data.append('password', this.password);
        axios
          .post('http://127.0.0.1:8081/api/rootlogin', data)
          .then((res) => {
            this.data = res.data.data;
            var result = new URLSearchParams();
            result.append('rootid', this.data.rootid);
            result.append('rootname', this.data.rootname);
            result.append('rootpassword', this.data.rootpassword);
            result.append('rootstate', this.data.rootstate);
            if (res.data.state === 0) {
              axios
                .post('http://127.0.0.1:8081/api/saveroot', result)
                .then((res) => {})
                .catch((err) => {
                  console.log(err);
                });
              window.location.href = './pages/roothome.html';
            } else if (res.data.state === 1) {
              this.$message.error('账号或密码错误！');
            } else {
              this.$message.error('你的账号未注册，请先注册再登录！');
            }
          })
          .catch((err) => {
            this.$message.error('管理员请求错误，请稍后再试！');
          });
      } else {
        var data = new URLSearchParams();
        data.append('username', this.username);
        data.append('password', this.password);
        axios
          .post('http://127.0.0.1:8081/api/login', data)
          .then((res) => {
            if (res.data.state === 0) {
              this.data = res.data.data;
              var result = new URLSearchParams();
              result.append('authentication', this.data.authentication);
              result.append('username', this.data.username);
              result.append('cid', this.data.cid);
              result.append('ccardid', this.data.ccardid);
              result.append('cname', this.data.cname);
              result.append('cphone', this.data.cphone);
              axios
                .post('http://127.0.0.1:8081/api/saveuser', result)
                .then((res) => {
                  if (res.data.state === 0) {
                    window.location.href = './pages/home.html';
                  } else {
                    console.log(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              window.location.href = './pages/home.html';
            } else if (res.data.state === 1) {
              this.$message.error('账号或密码错误！');
            } else {
              this.$message.error('你的账号未注册，请先注册再登录！');
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error('请求错误，请稍后再试！');
          });
      }
    },
  },
});
