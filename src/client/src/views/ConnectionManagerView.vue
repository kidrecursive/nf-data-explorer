<template>
  <el-container style="height: 100%; background-color: #f3f5f8;">
    <el-aside
      width="220px"
      style="border-right: 1px solid #d1dbe5; margin-right: 20px;"
    >
      <el-button
        type="success"
        style="margin-left: 18px; margin-top: 34px; margin-bottom: 24px;"
        >New Connection</el-button
      >
      <el-menu style="border-right: none; background-color: #f3f5f8;">
        <el-menu-item-group title="Starred">
          <el-menu-item index="1-1" style="height: 36px; line-height: 36px;"
            ><i
              class="el-icon-star-on"
              style="
                width: 14px;
                height: 14px;
                font-size: 14px;
                margin-top: -2px;
              "
            ></i>
            App Production
          </el-menu-item>
          <el-menu-item index="1-2" style="height: 36px; line-height: 36px;"
            ><i
              class="el-icon-star-on"
              style="
                width: 14px;
                height: 14px;
                font-size: 14px;
                margin-top: -2px;
              "
            ></i>
            App Staging
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Recent" style="margin-top: 16px;">
          <el-menu-item index="2-1" style="height: 36px; line-height: 36px;"
            ><i
              class="el-icon-switch-button"
              style="
                width: 14px;
                height: 14px;
                font-size: 14px;
                margin-top: -2px;
              "
            ></i>
            Cluster C
          </el-menu-item>
          <el-menu-item index="2-2" style="height: 36px; line-height: 36px;"
            ><i
              class="el-icon-switch-button"
              style="
                width: 14px;
                height: 14px;
                font-size: 14px;
                margin-top: -2px;
              "
            ></i>
            Cluster A
          </el-menu-item>
          <el-menu-item index="2-3" style="height: 36px; line-height: 36px;"
            ><i
              class="el-icon-switch-button"
              style="
                width: 14px;
                height: 14px;
                font-size: 14px;
                margin-top: -2px;
              "
            ></i>
            Cluster B
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <el-row :gutter="36" style="width: 100%;">
          <el-col :span="16">
            <h3>Cluster Settings</h3>
            <el-tabs v-model="activeName">
              <el-tab-pane
                label="Cassandra"
                name="cassandra"
                style="background: #fff; padding: 32px; padding-bottom: 16px;"
              >
                <el-form ref="form" :model="cassandraForm" label-width="120px">
                  <el-form-item label="Connection Points">
                    <el-input
                      type="textarea"
                      v-model="cassandraForm.connectionPoints"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Username">
                    <el-input v-model="cassandraForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="Password">
                    <el-input
                      type="password"
                      v-model="cassandraForm.password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary">Connect</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane
                label="Astra DB"
                name="astradb"
                style="background: #fff; padding: 32px; padding-bottom: 16px;"
              >
                <el-form ref="form" :model="astraDBForm" label-width="120px">
                  <el-form-item label="Connect Bundle">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      multiple="false"
                    >
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                      </div>
                      <div class="el-upload__tip" slot="tip">
                        connection bundle zip files can be found <a>here</a>.
                      </div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="Client ID">
                    <el-input v-model="astraDBForm.clientID"></el-input>
                  </el-form-item>
                  <el-form-item label="Client Secret">
                    <el-input
                      type="password"
                      v-model="astraDBForm.clientSecret"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary">Connect</el-button>
                  </el-form-item>
                </el-form></el-tab-pane
              >
            </el-tabs>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" style="margin-top: 96px;">
              <div slot="header" class="clearfix">
                <h4 style="margin: 0px; padding: 0px;">Need a cluster?</h4>
              </div>
              <p>
                DataStax Astra DB is a multi-cloud DBaaS Built on Apache
                Cassandra.
              </p>
              <el-button type="success" plain>Get Started</el-button>
            </el-card>
            <div>
              <h4 style="margin-bottom: 0px; margin-top: 32px;">
                Need help connecting?
              </h4>
              <p>View the connection documentation <a href="">here</a>.</p>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue';
import {
  Button,
  Card,
  Menu,
  MenuItem,
  MenuItemGroup,
  Container,
  Aside,
  Row,
  Col,
  Main,
  Icon,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Upload,
} from 'element-ui';
import { Routes } from '@/router/routes';

export default Vue.extend({
  name: 'ConnectionManagerView',
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup,
    [Container.name]: Container,
    [Aside.name]: Aside,
    [Row.name]: Row,
    [Col.name]: Col,
    [Main.name]: Main,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Upload.name]: Upload,
    [Input.name]: Input,
  },
  data() {
    return {
      Routes,
      activeName: 'cassandra',
      cassandraForm: {
        connectionPoints: '',
      },
      astraDBForm: {},
    };
  },
});
</script>
<style module></style>
<style>
.el-tabs__content {
  flex: 1;
  /*overflow: scroll !important; */
  overflow: auto !important;
  margin-top: -14px;
}
</style>
