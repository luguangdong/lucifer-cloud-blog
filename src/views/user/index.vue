<script lang="ts" setup>
import {onMounted, watchEffect} from 'vue'
import Wow from 'wow.js'

import UserinfoCard from './components/userinfoCard.vue'
import LikeList from './components/likeList.vue'

// hooks
import {useUser} from './hooks'

const {userData, getExhibitionList, tabChange, changeStatus} = useUser()

onMounted(() => {
  const wow = new Wow({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset: 10, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    callback: function () {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: '#user-bottom-content', // optional scroll container selector, otherwise use window
  })

  wow.init()
})

</script>

<template>
  <div class="container m-auto" id="user-container">
    <div class="userinfo-wrapper">
      <UserinfoCard
          @tabChange="tabChange"
          :approved="userData.approved"
          :in_review="userData.in_review"
          :review_rjection="userData.review_rjection"
          :open="userData.open"
      ></UserinfoCard>
    </div>

    <n-empty
        description="是空的？"
        :show-icon="false"
        v-if="userData.list.length === 0"
        style="
              background-color: rgba(0, 0, 0, 0.5);
              margin: 10px 0;
              padding: 20px 0;
              border-radius: 5px;
        "
    >
      <template #extra>
        <div class="empty-wrapper">
          <img src="@/assets/empty.png" alt="呆萌" style="height: 300px"/>
        </div>
      </template>
    </n-empty>
    <div class="bottom-content" id="user-bottom-content" v-else>
      <div
          v-for="item in userData.list"
          :key="item.uid"
          class="bottom-card-wrapper"
      >
        <LikeList
            :status="item.status"
            :url="item.cover"
            :path="item.path"
            :id="item.uid"
            v-model="item.reject_res"
            @submit="(e: number) => changeStatus(e, item.uid, item.reject_res)"
        ></LikeList>
      </div>
    </div>
    <div class="page">
      <n-pagination
          v-model:page="userData.page"
          v-model:page-size="userData.limit"
          :item-count="userData.total"
          :page-sizes="
            [
                {label: '9/页', value: 9},
                {label: '12/页', value: 12},
            ]"
          show-size-picker
          @page="(e: number) => userData.page = e"
          @update:page-size="(e: number) => userData.limit = e"
      />
    </div>

  </div>
</template>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 160px 120px;
  overflow-y: auto;


  .userinfo-wrapper {
    width: 100%;
  }

  .bottom-content {
    box-sizing: border-box;
    width: 100%;
    //margin-top: 25px;
    display: grid;
    background: linear-gradient(145deg, #cfd6dc, #f6ffff);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;

  }

  .page {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    background: linear-gradient(145deg, #cfd6dc, #f6ffff);
    padding: 10px 0;
    border-radius: 5px;
  }

}
</style>
