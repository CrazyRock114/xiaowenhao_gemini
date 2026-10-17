<script setup lang="ts">
import { ref } from 'vue'
import { useKidsStore, AVATAR_CHOICES } from '../stores/kids'

const kids = useKidsStore()
const editing = ref(false)

function pick(id: string) {
  kids.selectKid(id)
}

function pickTwin() {
  kids.selectTwin()
}

function nextAvatar(kidId: string, current: string) {
  const idx = AVATAR_CHOICES.indexOf(current)
  kids.updateKid(kidId, { avatar: AVATAR_CHOICES[(idx + 1) % AVATAR_CHOICES.length] })
}

const gradeOptions = [1, 2, 3, 4, 5, 6]
</script>

<template>
  <div class="picker card anim-pop">
    <template v-if="!editing">
      <h2 class="title">谁要来探索呀？🙋</h2>
      <p class="sub">选一个小主人，星星和徽章会记在你的名下。</p>
      <div class="avatars">
        <button v-for="kid in kids.kids" :key="kid.id" class="avatar-btn" @click="pick(kid.id)">
          <span class="avatar">{{ kid.avatar }}</span>
          <span class="name">{{ kid.name }}</span>
          <span class="grade">{{ kid.grade }} 年级</span>
        </button>
      </div>
      <button v-if="kids.kids.length >= 2" class="twin-btn" @click="pickTwin()">
        <span class="twin-avatars">
          <span>{{ kids.kids[0].avatar }}</span><span>{{ kids.kids[1].avatar }}</span>
        </span>
        <span class="twin-text">
          <strong>{{ kids.kids[0].name }} & {{ kids.kids[1].name }} 一起学</strong>
          <small>测验各选各的答案，星星分开记</small>
        </span>
      </button>
      <button class="manage" @click="editing = true">⚙️ 管理档案</button>
    </template>

    <template v-else>
      <h2 class="title">管理小主人档案</h2>
      <div class="edit-list">
        <div v-for="kid in kids.kids" :key="kid.id" class="edit-row">
          <button class="avatar-edit" :title="'换头像'" @click="nextAvatar(kid.id, kid.avatar)">
            {{ kid.avatar }}
          </button>
          <input v-model="kid.name" class="name-input" maxlength="8" @change="kids.persist()" />
          <select :value="kid.grade" class="grade-select" @change="kids.updateKid(kid.id, { grade: Number(($event.target as HTMLSelectElement).value) })">
            <option v-for="g in gradeOptions" :key="g" :value="g">{{ g }} 年级</option>
          </select>
          <button
            v-if="kids.kids.length > 1"
            class="remove"
            title="删除档案"
            @click="kids.removeKid(kid.id)"
          >
            🗑️
          </button>
        </div>
      </div>
      <div class="edit-actions">
        <button class="btn btn-ghost btn-sm" @click="kids.addKid()">＋ 添加小主人</button>
        <button class="btn btn-sm" @click="editing = false">完成</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.picker {
  max-width: 560px;
  margin: 40px auto;
  text-align: center;
  padding: 34px 28px;
}

.title {
  font-size: 24px;
}

.sub {
  color: var(--ink-soft);
  margin: 8px 0 22px;
}

.avatars {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

.avatar-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px 26px;
  border-radius: 20px;
  background: #fbf6ee;
  border: 3px solid transparent;
  transition: transform 0.15s, border-color 0.15s, background 0.15s;
}

.avatar-btn:hover {
  transform: translateY(-4px) scale(1.03);
  border-color: var(--brand);
  background: var(--brand-soft);
}

.twin-btn {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 22px;
  border-radius: 18px;
  border: 2px dashed var(--brand);
  background: rgba(255, 255, 255, 0.75);
  transition: transform 0.15s, background 0.15s, box-shadow 0.15s;
}

.twin-btn:hover {
  transform: translateY(-3px);
  background: #fff;
  box-shadow: var(--shadow);
}

.twin-avatars {
  display: flex;
}

.twin-avatars span {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--brand-soft);
  display: grid;
  place-items: center;
  font-size: 22px;
  border: 3px solid #fff;
}

.twin-avatars span + span {
  margin-left: -10px;
}

.twin-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.twin-text strong {
  font-size: 15.5px;
}

.twin-text small {
  color: var(--ink-soft);
  font-size: 12.5px;
}

.avatar {
  font-size: 52px;
  line-height: 1;
}

.name {
  font-weight: 800;
  font-size: 17px;
}

.grade {
  font-size: 12.5px;
  color: var(--ink-soft);
}

.manage {
  margin-top: 22px;
  color: var(--ink-faint);
  font-size: 14px;
}

.manage:hover {
  color: var(--ink-soft);
}

.edit-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
  text-align: left;
}

.edit-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-edit {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--brand-soft);
  font-size: 26px;
  flex-shrink: 0;
}

.avatar-edit:hover {
  background: #ffd9b8;
}

.name-input {
  flex: 1;
}

.grade-select {
  width: 108px;
}

.remove {
  font-size: 18px;
  opacity: 0.7;
}

.remove:hover {
  opacity: 1;
}

.edit-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}
</style>
