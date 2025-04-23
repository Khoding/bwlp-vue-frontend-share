<template>
  <dialog ref="dialogRef" :class="dialogStyling" class="detail-dialog">
    <header class="scroll bottom-margin">
      <nav class="m l">
        <h5 class="max">{{ title }}</h5>

        <button class="inverse-primary" @click="sendCloseEvent">
          <i>close</i>
          <span>Close dialog</span>
        </button>
      </nav>

      <nav class="s vertical">
        <h5 class="max">{{ title }}</h5>

        <button class="inverse-primary" @click="sendCloseEvent">
          <i>close</i>
          <span>Close dialog</span>
        </button>
      </nav>
    </header>

    <main class="bottom-margin">
      <article>
        <div>
          <div class="tabs scroll">
            <a
              v-for="tab in tabs"
              :key="tab.id"
              :data-ui="`#${tab.id}`"
              class="vertical ripple"
              :class="{active: activeTab === tab.id}"
              @click="setActiveTab(tab.id)"
            >
              <i>{{ tab.icon }}</i>
              <span>{{ tab.label }}</span>
            </a>
          </div>
          <div
            v-for="tab in tabs"
            :key="tab.id"
            :id="tab.id"
            class="page padding scroll"
            :class="{active: activeTab === tab.id}"
          >
            <component :is="tab.component" v-bind="tab.props" />
          </div>
        </div>
      </article>
    </main>

    <footer class="scroll">
      <nav>
        <div class="max">
          <button class="no-break tertiary ripple" @click="copyLinkToClipboard">
            <i class="small">share</i>
            Share "{{ title }}"
            <span class="tooltip right">Copy link to clipboard</span>
          </button>
        </div>

        <div class="button-group">
          <RouterLink v-if="duplicateRoute" :to="duplicateRoute" class="button border tertiary">
            <i>content_copy</i>
            <span>Duplicate</span>
          </RouterLink>
          <RouterLink v-if="editRoute" :to="editRoute" class="button border secondary">
            <i>edit</i>
            <span>Edit {{ title }}</span>
          </RouterLink>
        </div>
      </nav>
    </footer>
  </dialog>
</template>

<script setup lang="ts">
import {ref, watch, onMounted, useTemplateRef} from '@vue/runtime-core';
import {useEventListener} from '@vueuse/core';
import {useRouter} from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  tabs: {
    type: Array,
    default: () => [],
    /// Each tab should have: { id, icon, label, component, props }
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  editRoute: {
    type: [String, Object],
    default: null,
  },
  duplicateRoute: {
    type: [String, Object],
    default: null,
  },
  dialogStyling: {
    type: String,
    default: 'max', /// right large-width, bottom jumbo-height, etc.
    /// TODO-MAYBE: Maybe give the user the ability to choose which kind of dialog they want,
    /// different sizes and stuff can be found there:
    /// https://github.com/beercss/beercss/blob/1f53933c3861430da54a87237a44609cef5adbe4/docs/DIALOG.md
    /// https://github.com/beercss/beercss/blob/1f53933c3861430da54a87237a44609cef5adbe4/docs/HELPERS.md
  },
});

const emit = defineEmits(['close-wanted']);

const dialogRef = useTemplateRef('dialogRef');
const activeTab = ref('');
const router = useRouter();

onMounted(() => {
  if (props.tabs.length > 0) {
    activeTab.value = props.tabs[0].id;
  }

  toggleDOM(props.isOpen);
});

useEventListener('keydown', e => {
  if (e.key === 'Escape' && props.isOpen) {
    sendCloseEvent();
  }
});

useEventListener('click', e => {
  if (dialogRef.value && !dialogRef.value.contains(e.target)) {
    sendCloseEvent();
  }
});

const setActiveTab = tabId => {
  activeTab.value = tabId;
};

const sendCloseEvent = () => {
  const route = window.location.pathname;
  if (route.match(/\/image\/[^\/]+$/)) {
    router.push({name: 'ImageList', replace: false});
  } else if (route.match(/\/lecture\/[^\/]+$/)) {
    router.push({name: 'LectureList', replace: false});
  } else {
    emit('close-wanted');
  }
};

const toggleDOM = show => {
  const dialog = dialogRef.value;
  if (!dialog) return;

  try {
    if (show) {
      if (!dialog.open) {
        dialog.showModal();
      }
      if (!dialog.open) {
        throw new Error('Failed to open dialog');
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      if (dialog.open) {
        throw new Error('Failed to close dialog');
      }
    }
  } catch (error) {
    console.error('Dialog state sync error:', error);
    sendCloseEvent();
  }
};

watch(() => props.isOpen, toggleDOM);

const copyLinkToClipboard = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
};
</script>

<style scoped>
/* This is an example of a height that isn't available by default
      (to give users more abilities to customize,
        we can add an infinite amount of them) */
.detail-dialog .jumbo-height {
  block-size: 42rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}
</style>
