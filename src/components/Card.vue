<template>
  <article>
    <h3>
      <slot name="header"></slot>
    </h3>

    <hr class="small" />

    <div>
      <slot name="content"></slot>
    </div>
  </article>
</template>

<style scoped>
h3 {
  overflow-wrap: break-word;
}
</style>
