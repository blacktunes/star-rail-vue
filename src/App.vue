<template>
  <Main
    :viewport="{
      width: 3200,
      bottom: 100
    }"
    :popup="popupManager"
    @click="click"
  >
  </Main>
</template>

<script lang="ts" setup>
import { createPopupManager, Main, confirm } from '.'

const popupManager = createPopupManager({
  confirm
})

const click = () => {
  popupManager.open('confirm', {
    title: '测试',
    text: ['测试文本']
  })
}
</script>

<style lang="stylus">
body
  margin 0
  background:
    linear-gradient(217deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0) 70.71%),
    linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%)
</style>

<style lang="stylus" scoped></style>
