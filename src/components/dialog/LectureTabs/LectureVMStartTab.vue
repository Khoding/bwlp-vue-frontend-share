<template>
  <section class="grid">
    <table class="s12 l5 stripes bottom-margin">
      <thead>
        <tr>
          <th>Data</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="min">Dateinamenserweiterung</td>
          <td class="bold">bat</td>
        </tr>
        <tr>
          <td class="min">Sichtbarkeit</td>
          <td class="bold">
            {{ getVisibilitySetting(parseString(lecture.runscript).visibility) }}
          </td>
        </tr>
        <tr>
          <td class="min">Audio</td>
          <td class="bold">
            {{ getAudioSetting(parseString(lecture.runscript).soundMuted) }}
          </td>
        </tr>
      </tbody>
    </table>

    <section class="s12 l6">
      <nav class="pre-title left-padding">
        <div class="max">Run script</div>
        <div class="ext bold text-monospace min left-padding right-padding">bat</div>
      </nav>
      <!-- TODO: Maybe use Shiki (https://shiki.style) for this part -->
      <pre class="code-pre scroll"><code>start firefox.exe "https://bwlp.khodok.com"
exit</code></pre>
    </section>
  </section>
</template>

<script setup lang="ts">
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});

function parseString(input) {
  if (!input) {
    return {
      ext: '',
      visibility: null,
      soundMuted: null,
      script: '',
    };
  }

  const result = {
    ext: '',
    visibility: null,
    soundMuted: null,
    script: '',
  };

  const parts = input.split('\n');
  const firstLine = parts[0];

  const settings = firstLine.split(' ')[0];

  settings.split(';').forEach(setting => {
    const [key, value] = setting.split('=');
    if (key === 'ext') {
      result.ext = value || '';
    } else if (key === 'visibility') {
      result.visibility = parseInt(value);
    } else if (key === 'soundMuted') {
      result.soundMuted = parseInt(value);
    }
  });

  const scriptInFirstLine = firstLine.slice(settings.length).trim();
  if (scriptInFirstLine) {
    result.script = scriptInFirstLine;
  } else if (parts.length > 1) {
    result.script = parts.slice(1).join('\n');
  }

  return result;
}

function getAudioSetting(setting) {
  switch (setting) {
    case -1:
      return 'Vorgabe des Pools';
    case 0:
      return 'Aktivieren';
    case 1:
      return 'Stummschalten';
    default:
      return 'Unbekannt';
  }
}

function getVisibilitySetting(setting) {
  switch (setting) {
    case 0:
      return 'Versteckt';
    case 1:
      return 'Normal';
    case 2:
      return 'Minimiert';
    default:
      return 'Unbekannt';
  }
}
</script>

<style scoped>
.pre-title {
  border-inline-start: var(--primary) 4px solid;
  border-block-end: 1px solid var(--primary);
  background-color: var(--surface-container);
  font-size: 1rem;

  & .ext {
    background-color: var(--secondary-container);
    color: var(--secondary);
  }

  & + pre {
    margin-block-start: 0;
  }
}

.code-pre {
  max-block-size: 7rem;
}
</style>
