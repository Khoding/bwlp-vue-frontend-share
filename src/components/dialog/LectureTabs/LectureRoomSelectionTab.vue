<template>
  <section class="grid large-space">
    <section class="s12 l6 medium-height surface scroll small-padding">
      <LocationTreeItem v-for="location in locationsTree" :key="location.id" :location="location" />
    </section>

    <section class="s12 l6">
      <div>
        <label class="radio">
          <input
            type="radio"
            :id="`exclusive_priority_radio_${lecture.lectureId}`"
            :name="`exclusive_priority_radio_${lecture.lectureId}`"
            :checked="lecture.limitToLocations"
            disabled
          />
          <span class="wrap">
            Veranstaltung ausschließlich in den ausgewählten Räumen anzeigen
          </span>
        </label>
      </div>
      <div>
        <label class="radio">
          <input
            type="radio"
            id="exclusive_priority_radio"
            name="exclusive_priority_radio"
            disabled
          />
          <!-- TODO: It must be unchecked if the user is a dumbass or whatever and checked otherwise -->
          <!-- If one radio is on, the other cannot be on -->
          <span class="wrap">
            Veranstaltung mit höherer Priorität in den ausgewählten Räumen anzeigen
          </span>
        </label>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import {computed} from '@vue/runtime-core';
import LocationTreeItem from '@/components/dialog/LectureTabs/TabsComponents/LocationTreeItem.vue';

const props = defineProps({
  lecture: {
    type: Object,
    required: true,
  },
  locations: {
    type: Object,
    required: true,
  },
});

interface LocationNode {
  locationId: string | number;
  parentLocationId?: string | number;
  children: LocationNode[];
  [key: string]: any;
}

const locationsTree = computed(() => {
  const tree: Record<string | number, LocationNode> = {};

  // First pass: Create all nodes
  Object.values(props.locations).forEach(
    (location: {locationId: string | number; parentLocationId?: string | number}) => {
      tree[location.locationId] = {
        ...location,
        children: [],
      };
    },
  );

  // Second pass: Build parent-child relationships
  Object.values(tree).forEach((node: LocationNode) => {
    if (node.parentLocationId && tree[node.parentLocationId]) {
      tree[node.parentLocationId].children.push(node);
    }
  });

  // Return only root nodes (nodes without parents)
  return Object.values(tree).filter(node => !node.parentLocationId);
});
</script>
