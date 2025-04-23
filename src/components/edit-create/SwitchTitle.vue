<template>
  <div class="field middle-align">
    <nav>
      <div class="max">
        <h6>{{ title }}</h6>
        <div v-if="description">{{ description }}</div>
      </div>
      <label class="switch">
        <input
          type="checkbox"
          :id="`switch-${slugify(title)}`"
          :name="`switch-${slugify(title)}`"
          :checked="model"
          @change="model = $event.target.checked"
        />
        <span></span>
      </label>
    </nav>
  </div>
</template>

<script setup>
const model = defineModel({
  required: true,
  type: Boolean,
});

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

// https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n
function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}
</script>
