<template>
  <Card>
    <template #header>{{ $t('userAgreement.title') }}</template>
    <template #content>
      <p class="subtitle">bwLehrpool-Suite (Dozentenmodul)</p>
      <p class="subtitle">Copyright © 2016 Universität Freiburg</p>

      <p class="big-paragraph">
        Die Verwendung dieses Programms ist nur in Abstimmung mit der jeweils beteiligten
        Hochschulinstitution zulässig und unterliegt deren Bestimmungen und Einschränkungen. Im
        Rahmen des bwLehrpool-Systems erstellte und bereitgestellte Virtuelle Maschinen, die unfrei
        lizensierte Software enthalten, dürfen nur mit Erlaubnis bzw. Lizenzierung der betreffenden
        Rechteinhaber eingesetzt und weitergegeben werden.
      </p>
      <p class="big-paragraph">
        Insbesondere wird ausdrücklich darauf hingewiesen, dass die Verantwortung in Bezug auf
        eventuell notwendige Lizenzierung sämtlicher Software innerhalb einer Virtuellen Maschine,
        regelmäßiger Aktualisierung und rechtzeitigen Einspielens von Sicherheitsupdates
        ausschließlich beim erstellenden Personal liegt.
      </p>

      <p class="subtitle">Lizenzierung des Programms</p>
      <p class="big-paragraph">
        Dieses Programm ist freie Software. Es kann unter den Bedingungen der GNU General Public
        License (GPL) Version 2 verändert und weitergegeben werden. Der vollständige Text der GNU
        General Public Licence der Version 2 (GPL2) kann hier
        <a
          href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
          class="link underline ripple"
          target="_blank"
          rel="noopener noreferrer"
          >https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
          <OpenInBlank />
        </a>
        eingesehen werden.
      </p>
      <p class="big-paragraph">
        Es wird, soweit gesetzlich zulässig, keinerlei Gewährleistung für dieses Programm, weder
        ausdrücklich noch implizit, geleistet. Der Urheberrechtsinhaber stellt das Programm „wie es
        ist“ zur Verfügung. Es werden einschließlich Marktreife oder Verwendbarkeit für einen
        bestimmten Zweck keinerlei Eigenschaften zugesichert.Das volle Risiko bezüglich Qualität,
        Leistungsfähigkeit oder jeglicher allgemeiner oder spezieller Schäden, Schäden durch
        Nebenwirkungen oder Folgeschäden, die aus Benutzung oder Unbenutzbarkeit des Programms
        folgen (einschließlich Datenverlusten oder fehlerhafter Verarbeitung von Daten) liegt auf
        Seiten des Anwenders / der Anwenderin.
      </p>
    </template>
  </Card>
</template>

<script setup>
import Card from '@/components/Card.vue';
import OpenInBlank from '@/components/OpenInBlank.vue';
</script>

<style scoped>
.subtitle,
.big-paragraph {
  margin-block-start: 0;
  margin-block-end: 0;
}

.big-paragraph {
  margin-block-start: 1rem;

  & + & {
    margin-block-start: 0rem;
  }

  & + .subtitle {
    margin-block-start: 1rem;
  }
}

.subtitle {
  font-weight: bold;

  &:not(:has(~ .subtitle)) + .big-paragraph {
    margin-block-start: 0;
  }
}
</style>
