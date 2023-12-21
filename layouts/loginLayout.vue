<template>
  <a-flex align="center" justify="center" style="height: 100vh;">
    <a-spin :spinning="spinning" tip="Loading...">
      <a-card style="max-width: 800px; margin: 0 8px">
        <a-form
            :model="formState"
            class="login-form"
            name="normal_login"
            @finish="onFinish"
        >
          <a-form-item
              :rules="[{ required: true, message: 'Please input your username!' }]"
              label="Username"
              name="username"
          >
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon"/>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
              :rules="[{ required: true, message: 'Please input your password!' }]"
              label="Password"
              name="password"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-flex justify="space-between" wrap>
            <a-form-item>
              <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
              </a-form-item>
            </a-form-item>
            <a-form-item>
              <a-button class="login-form-button" html-type="submit" type="primary">
                Log in
              </a-button>
            </a-form-item>
          </a-flex>
        </a-form>
      </a-card>
    </a-spin>
  </a-flex>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {LockOutlined, UserOutlined} from '@ant-design/icons-vue';
import {useLoginStatusStore} from "~/stores/loginStatusStore";
import {notifyPush, notifyType} from "~/services/notify";

const useLoginStatus = useLoginStatusStore();
const tokenCookie = useCookie('token');

const spinning = ref<boolean>(false);
const formState = reactive({
  username: '',
  password: '',
  remember: false,
});

const onFinish = async (values: FormState) => {
  spinning.value = true;
  const token = await $fetch('/api/account/login', {
    method: 'POST',
    body: {
      username: values.username,
      password: values.password,
    },
  });
  if (!token) {
    notifyPush({
      type: notifyType.error,
      message: '登入失敗',
      description: '帳號或密碼錯誤',
    });
  } else {
    if (values.remember)
      tokenCookie.value = token;
    notifyPush({
      type: notifyType.success,
      message: '登入成功',
      description: '歡迎回來',
    });
    useLoginStatus.setLogIn(token);
  }
  spinning.value = false;
};

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
