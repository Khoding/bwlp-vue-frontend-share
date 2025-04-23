<template>
  <div>
    <header class="transparent no-padding">
      <div class="search field label suffix border top-margin round">
        <input
          id="search"
          name="search"
          type="text"
          v-model="searchQuery"
          class="search-input"
          placeholder="Search..."
          @input="filterItems"
        />
        <label for="search">Filter the {{ itemLabel.toLowerCase() }}</label>
        <i>search</i>
      </div>
    </header>

    <section class="large-height surface scroll">
      <table v-if="filteredItems.length > 0" class="stripes">
        <thead class="fixed">
          <tr>
            <th
              v-for="column in columns"
              :key="(column as Column).field"
              @click="sort(column.field)"
              :class="['sortable', column.class]"
            >
              {{ column.label }}
              <span class="sort-icon">{{ getSortIcon(column.field) }}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in filteredAndSortedItems"
            :key="getItemKey(item)"
            :id="getItemKey(item)"
            class="ripple pointer"
            @click.stop="$emit('row-click', item)"
          >
            <td v-for="column in columns" :key="column.field" :class="column.class">
              <template v-if="column.formatter">
                {{ column.formatter(item[column.field], item) }}
                <!-- TODO: make the color red if the date < currentTime in case it applies -->
              </template>

              <template v-else-if="column.field === 'ownerId'">
                <!-- TODO: make the text bold if the ownerId matches the currently logged in user's id -->
                <!-- also do it for everywhere else that has ownerId, or updaterId, etc. -->
                <!-- Use local lookup function -->
                {{ getLocalUserFullName(item[column.field]) }}
              </template>

              <template v-else-if="column.field === 'osId'">
                <!-- Use local lookup function -->
                {{ getLocalOSName(item[column.field]) }}
              </template>

              <template v-else-if="column.field === 'virtId'">
                <VirtLogo :virt="item[column.field]" />
              </template>

              <template v-else-if="column.field === 'isEnabled'">
                <label class="checkbox center">
                  <!-- Correctly bind the checked state to the item's property -->
                  <input type="checkbox" :checked="item[column.field]" disabled />
                  <span></span>
                </label>
              </template>

              <template v-else>
                {{ item[column.field] }}
              </template>
            </td>
          </tr>
        </tbody>

        <tfoot class="fixed">
          <tr>
            <th :colspan="createRoute !== '' ? footerColspan : columns.length">
              Showing {{ filteredItems.length }} of {{ items.length }}
              {{ itemLabel }}
            </th>
            <th
              v-if="createRoute"
              :colspan="columns.length - footerColspan"
              class="right-align no-padding"
            >
              <RouterLink
                :to="{name: createRoute}"
                class="button small small-padding large-round border tertiary-border tertiary-text no-margin ripple"
              >
                <i>add</i>
                Create {{ itemLabel.toLowerCase().replace('s', '') }}
              </RouterLink>
            </th>
          </tr>
        </tfoot>
      </table>

      <div v-else>
        <article class="error">
          <nav>0 matches found</nav>
        </article>

        <RouterLink :to="{name: createRoute}" class="button top-margin"
          >Create {{ itemLabel.toLowerCase().replace('s', '') }}</RouterLink
        >
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import VirtLogo from '@/components/VirtLogo.vue';

import usersData from '@/assets/js/bwlp/fetchUsers.json';
import osListData from '@/assets/js/bwlp/osList.json';

const getLocalUserFullName = (userId: string): string => {
  if (!userId) return 'N/A';
  const user = usersData.find(u => u.userId === userId);
  return user ? `${user.firstName} ${user.lastName}`.trim() : userId;
};

const getLocalOSName = (osId: number): string => {
  if (osId === null || osId === undefined) return 'N/A';
  const os = osListData.find(o => o.osId === osId);
  return os ? os.osName : `Unknown OS (${osId})`;
};

interface Column {
  field: string;
  label: string;
  class?: string;
  formatter?: (value: any, item: any) => string;
}

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array as () => Column[],
    required: true,
  },
  itemKey: {
    type: String,
    required: true,
  },
  itemLabel: {
    type: String,
    required: true,
  },
  defaultSort: {
    type: Object,
    default: () => ({field: 'default', order: 'asc'}),
  },
  footerColspan: {
    type: Number,
  },
  createRoute: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['row-click']);

const sortField = ref(props.defaultSort.field);
const sortOrder = ref(props.defaultSort.order);

const getSortIcon = field => {
  if (sortField.value === 'default' || sortField.value !== field) return '⇕';
  return sortOrder.value === 'asc' ? '↑' : '↓';
};

const sort = field => {
  if (sortField.value === field) {
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc';
    } else if (sortOrder.value === 'desc') {
      sortField.value = 'default';
      sortOrder.value = 'asc';
    }
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
};

const getItemKey = item => {
  return item[props.itemKey];
};

const searchQuery = ref('');
const filteredItems = ref([]);

const filterItems = () => {
  if (!searchQuery.value) {
    filteredItems.value = props.items;
    return;
  }

  const query = searchQuery.value.toLowerCase();
  filteredItems.value = props.items.filter(item => {
    return props.columns.some(column => {
      const value = item[column.field];
      if (value === null || value === undefined) return false;

      if (column.field === 'ownerId') {
        return getLocalUserFullName(value).toLowerCase().includes(query);
      }
      if (column.field === 'osId') {
        return getLocalOSName(value).toLowerCase().includes(query);
      }
      if (column.formatter) {
        const formattedValue = column.formatter(value, item);
        return formattedValue ? formattedValue.toLowerCase().includes(query) : false;
      }
      if (column.field === 'virtId') {
        return String(value).toLowerCase().includes(query);
      }
      return String(value).toLowerCase().includes(query);
    });
  });
};

const filteredAndSortedItems = computed(() => {
  if (sortField.value === 'default') {
    return filteredItems.value;
  }

  return [...filteredItems.value].sort((a, b) => {
    let compareValue = 0;
    const field = sortField.value;
    let aValue = a[field];
    let bValue = b[field];

    if (field === 'ownerId') {
      aValue = getLocalUserFullName(aValue);
      bValue = getLocalUserFullName(bValue);
    } else if (field === 'osId') {
      aValue = getLocalOSName(aValue);
      bValue = getLocalOSName(bValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      compareValue = aValue - bValue;
    } else {
      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();
      compareValue = aStr.localeCompare(bStr);
    }

    return sortOrder.value === 'asc' ? compareValue : -compareValue;
  });
});

onMounted(() => {
  filteredItems.value = props.items;
});

watch(
  () => props.items,
  newItems => {
    filterItems();
  },
  {immediate: true},
);

watch(searchQuery, filterItems);
</script>

<style scoped>
.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.sort-icon {
  display: inline-block;
  margin-inline-start: 4px;
}

.search input:not(:focus)::placeholder {
  color: transparent;
}

.pointer {
  cursor: pointer;
}
</style>
