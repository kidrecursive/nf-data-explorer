<template>
  <el-container style="height: 100%; background-color: #f3f5f8;">
    <el-form ref="form" :model="astraDBForm" label-width="120px">
      <el-form-item label="Connect Bundle">
        <el-upload
          :on-change="handleChange"
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList"
          :multiple="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <div slot="tip" class="el-upload__tip">
            connection bundle zip files can be found on the connect page of your
            Astra DB instance.
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="Application Token">
        <el-input v-model="astraDBForm.applicationToken"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="saveInProgress" @click="submit"
          >Connect</el-button
        >
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { Button, Container, Form, FormItem, Input, Upload } from 'element-ui';
import router from '@/router';
import { insertAstraDBConfig } from '@/services/AstraDBService';
import { notify } from '@/utils/message-utils';
import { NotificationType } from '@/typings/notifications';

export default Vue.extend({
  name: 'ConnectionManagerView',
  components: {
    [Button.name]: Button,
    [Container.name]: Container,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Upload.name]: Upload,
    [Input.name]: Input,
  },
  data() {
    return {
      saveInProgress: false,
      fileList: [],
      rawFile: null,
      astraDBForm: {
        applicationToken: '',
      },
    };
  },
  methods: {
    handlePreview(file: any) {
      console.log(file);
    },
    handleChange(file: any) {
      this.rawFile = file.raw;
    },
    async submit() {
      this.saveInProgress = true;
      try {
        if (this.astraDBForm.applicationToken && this.rawFile) {
          await insertAstraDBConfig(
            this.astraDBForm.applicationToken,
            this.rawFile,
          );
          notify(
            NotificationType.Success,
            'Successfully added Astra DB Config',
            'AstraDB Config added.',
          );
          router.push(
            '/cassandra/clusters/astra/query?view=schema&query=&keyspace=&table=',
          );
        } else {
          throw new Error('Please fill out all fields');
        }
      } catch (err) {
        notify(NotificationType.Error, err.title, err.message);
      } finally {
        this.saveInProgress = false;
      }
    },
  },
});
</script>
<style module></style>
<style></style>
