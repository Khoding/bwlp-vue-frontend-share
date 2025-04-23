<template>
  <section class="location-item">
    <details v-if="location.children?.length > 0">
      <summary class="none">
        <article class="round no-elevate small-padding border primary-border ripple">
          <nav>
            <div class="max">{{ location.locationName }}</div>

            <i>expand_more</i>
          </nav>
        </article>
      </summary>

      <div class="left-margin">
        <LocationTreeItem v-for="child in location.children" :key="child.id" :location="child" />
      </div>
    </details>

    <article v-else class="round border middle-align small-padding">
      <label class="checkbox">
        <input :id="`checkbox_${location.locationName}`" type="checkbox" disabled />
        <span>{{ location.locationName }}</span>
      </label>
    </article>
  </section>
</template>

<script setup>
defineProps({
  location: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.location-item {
  user-select: none;

  .location-item {
    margin-inline-start: 0.5rem;
  }

  + .location-item,
  .location-item {
    margin-block-start: 0.5rem;
  }
}
</style>
