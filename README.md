# 崩坏:星穹铁道Vue组件库和相关工具

## 说明

```bash
npm i star-rail-vue
```

### Vue组件

#### 核心组件
- **Main** 固定宽高比的根组件
- **Popup** 弹出层模板

> [!WARNING]
> 以下组件都是以 **Main组件的默认宽高(3200*1800)** 为基准编写
> 在其他尺寸下可能会出现样式异常

#### 通用组件
- **Window** 窗口模板
- **Close**
- **Btn**
- **IconBtn**

#### 弹出层组件

> [!WARNING]
> 弹出层组件需要配合`PopupManager`使用

- **Loading**
  - `loading`
- **Log**
  - `log`
  - `setLog` 
- **Confirm**
  - `confirm` 
  - `useConfirm`
- **Cropper** 图片剪裁
  - `cropper`
  - `useCropper`
- **Input**
  - `input`
  - `useInput`
- **Select**
  - `select`
  - `useSelect`

### 工具
- **analytics** Google Analytics统计
- **imageCompress** 图片压缩
- **screenshot** 生成DOM截图
- **createDatabase** 创建IndexedDB数据库
- **createPopupManager** 创建弹出层管理器(`PopupManager`)

## 相关项目
- 崩坏:星穹铁道光锥生成器
  - https://github.com/blacktunes/sr-light-cone
  - https://light.shenmedouyou.top/
- 崩坏:星穹铁道短信生成器
  - https://github.com/blacktunes/sr-message-maker
  - https://sr.shenmedouyou.top/
- 绝区零绳网生成器
  - https://github.com/blacktunes/interknot
  - https://interknot.shenmedouyou.top/
- 碧蓝航线JUUs生成器
  - https://github.com/blacktunes/juus-maker
  - https://juus.shenmedouyou.top/

## 支持
如果你喜欢这个项目，可以给个⭐️或者[请我喝杯柠檬水](https://afdian.com/a/blacktune)
