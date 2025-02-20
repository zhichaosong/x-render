---
order: 0
toc: content
hide: true
group: 
  title: 其他
  order: 5
---

# V2 升级方案
本文档将帮助你从 1.x 升级到 2.x 版本，2.x 将不再对 0.x 版本进行兼容

## 特性

全新的 form-render 2.0 主要具备以下特性：

- 🚀 **更好的表单性能**：通过对 form-render 重构，底层接入 Antd Form 来实现表单的数据收集、校验等逻辑，提升表单的整体性能。有效的解决了表单数据改变表单全局刷新的问题。
- 🎨 **全新的UI样式**：通过对中后台表单业务梳理，定制了一套全新的 UI 样式和交互规范，提升表单整体美观度 。[最佳展示](/form-render/disaply-row)
- 🚥 **国际化**：国际化多语言支持，内置中英文语言包，英文版 locale: 'en-US'
- 💎 **Antd V5**：兼容 antd V5 版本，无需配置

## 依赖升级
```diff
"dependencies": {
- "form-render": "^1.0.0",
+ "form-render": "^2.0.0",
}
```

## 不兼容处理

### form.formData 弃用
form.formData 弃用，改用 form.getValues() 方式获取

```diff
- form.formData
+ form.getValues()
```

### theme 弃用
嵌套组件 theme 字段 弃用，统一改成 widget 声明。
默认是 widget: 'collapse' 折叠卡片，其他类型参考[横向布局](/form-render/disaply-row#二嵌套控件)示例


### useForm 入参移除
```js
{
  formData,
  onChange,
  onValidate,
  showValidate,
  /** 数据分析接口，表单展示完成渲染时触发 */
  logOnMount: _logOnMount,
  /** 数据分析接口，表单提交成功时触发，获得本次表单填写的总时长 */
  logOnSubmit: _logOnSubmit,
} 
```
logOnMount、logOnSubmit 通过 props 传递，其他几个废弃

注意 logOnMount、logOnSubmit 不再兼容从上获取 window.FR_LOGGER



### onFinish 提交函数
只有校验通过 onFinish 才会被触发，不在返回错误信息参数，为了兼容1.0版本，错误信息默认返回 []


```diff
- const onFinish = (data, errors) => {

}

+ const onFinish = (data) => {

}

```
### validateFields
errorInfo 的出参名称发生变更

```diff
validateFields()
  .then(values => {
    /*
    values:{
      input1: 'input1 输入的值'
    }
    */
  })
  .catch(errorInfo => {
    /*
    errorInfo:
      {
-       data: {
-         input1: 'input1 输入的值',
-        },

+        values: {
+          input1: 'input1 输入的值',
+        },


-        errors: [
-          { name: 'input1', error: ['input1 的error信息'] },
-       ]
+        errorFields: [
+          { name: ['password'], errors: ['Please input your Password!'] },
+        ],

      }
    */
  });
  
```

### globalProps 变更
通过`globalProps`注入的数据在任何组件（以及自定义组件）中可以被取到和使用。
变更：自定义组件 通过 props.addons.globalProps 然后进行解构，不在自动进行属性合并注入到自定义组件中（防止其他组件被污染）


### mapping 弃用
mapping 配置弃用，映射关系通过 widgets 组件实例进行覆盖（如果和内部名字一样会覆盖内部组件）
```json
input,
checkbox, // 勾选框
checkboxes, // checkbox多选
color,
date,
time,
dateRange,
timeRange,
imageInput,
url,
select,
multiSelect, // 下拉多选
number,
radio, // Radio.Group)
slider, // 带滚条的number
switch,
textarea,
upload,
html,
rate,
treeSelect,
errorSchemaWidget // 错误显示
```
