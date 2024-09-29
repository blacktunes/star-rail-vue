<template>
  <Main
    :viewport="{
      width: 3200,
      bottom: 100
    }"
    :popup="popupManager"
    @click="click"
  >
    <img
      v-if="image"
      :src="image"
      alt=""
    />
  </Main>
</template>

<script lang="ts" setup>
import { createPopupManager, Main, cropper } from '.'

const image = ref('')

const popupManager = createPopupManager({
  cropper
})

const click = () => {
  popupManager.open('cropper', { aspectRatio: 0.7, maxWidth: 1280 }).then((res) => {
    image.value = res.base64
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

<style lang="stylus" scoped>
.test
  font-size 200px
  user-select none
</style>
