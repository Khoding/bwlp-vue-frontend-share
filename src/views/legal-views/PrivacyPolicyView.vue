<template>
  <Card>
    <template #header>Datenschutzerklärung</template>
    <template #content>
      <section class="pp-section">
        <h4>Datenschutz</h4>
        <p class="big-paragraph">
          Wenn Sie sich an der bwLehrpool-Suite anmelden bzw. diese nutzen, werden verschiedene
          Informationen über Sie erfasst und gespeichert. Die nachfolgenden Punkte sollen Ihnen
          helfen zu verstehen, welche Daten zu welchem Zweck verwendet werden und wohin Sie sich bei
          Fragen wenden können.
        </p>
      </section>

      <hr class="small" />

      <section class="pp-section">
        <h4>Was wird gesammelt?</h4>
        <p class="big-paragraph">
          Beim Login werden Name, E-Mail, Hochschule sowie Zeitpunkt des letzten Logins gespeichert
          und einer eindeutigen Nutzer-ID zugeordnet. Dies umfasst auch Informationen darüber, wann
          Sie sich für die Nutzung erstmalig registriert haben. Außerdem werden Informationen über
          einige Ihrer Aktivitäten innerhalb der bwLehrpool-Suite erfasst (beispielsweise wenn Sie
          eine VM hochladen oder löschen).
        </p>
      </section>

      <hr class="small" />

      <section class="pp-section">
        <h4>Wozu werden diese Daten gesammelt?</h4>
        <p class="big-paragraph">
          Die Informationen sind notwendig, um VMs und Veranstaltungen Ihnen bzw. Ihren Kollegen
          eindeutig zuordnen und ggf. bei rechtlichen Verstößen eingreifen zu können. Wenn Sie VMs
          herunterladen (vom Satellitenserver oder öffentlichen Speicher), möchten Sie sicherlich
          wissen, von wem eine VM erstellt wurde und wen Sie ggf. kontaktieren können, falls die VM
          nicht wie erwartet funktioniert. Außerdem sind Nutzungsdaten für Diagnosezwecke wichtig,
          damit ein Administrator Ihnen helfen kann, falls Sie z.B. Ihre VM nicht mehr finden können
          und vermuten, dass diese von jemandem fälschlicherweise gelöscht wurde.
        </p>
      </section>

      <hr class="small" />

      <section class="pp-section">
        <h4>Mit wem werden diese Daten geteilt?</h4>
        <p class="big-paragraph">
          Die erhobenen Daten werden ausschließlich auf dem Satellitenserver gespeichert, mit dem
          Sie sich während des Logins verbunden haben. Dieser steht in der Regel unter der Kontrolle
          des Rechenzentrums Ihrer Hochschule. Bei der erstmaligen Nutzung der Suite wurden Sie
          aufgefordert, sich über ein Webportal zu registrieren. Dies ist notwendig, um Ihre
          Zustimmung zur Speicherung und Verarbeitung Ihrer Daten zum Zweck des
          hochschulübergreifenden VM-Austauschs einzuholen. Die dort angegebenen Informationen
          stehen unter der Verwaltung des bwLehrpool-Teams in Freiburg. Wenn Sie eine VM auf den
          öffentlichen Speicher hochladen, wird die VM sowie damit verknüpfte Metadaten (Name des
          Besitzers/Erstellers, Zeitpunkt der Erstellung und letzten Änderung) auf den zentralen
          Server des bwLehrpool-Teams in Freiburg übertragen. Auch Nutzer anderer an bwLehrpool
          teilnehmenden Hochschulen können nun Ihre VM sowie die damit verbundenen (Kontakt-)Daten
          einsehen.
        </p>
      </section>

      <hr class="small" />

      <section class="pp-section">
        <h4>Wie lange werden Daten gespeicher?</h4>
        <p class="big-paragraph">
          Informationen werden gespeichert, bis sie nicht mehr benötigt werden, um die notwendige
          Funktionalität bereitzustellen. Dies hängt auch von Faktoren wie der Art der
          Informationen, warum sie gesammelt und verarbeitet werden sowie den relevanten rechtlichen
          oder betrieblichen Speicherbedürfnissen ab.
        </p>
      </section>

      <hr class="small" />

      <section class="pp-section">
        <h4>Wohin kann ich mich bei Fragen wenden?</h4>
        <p class="big-paragraph">
          Kontaktieren Sie als erstes Ihr Rechenzentrum. In der Regel wird dort der
          Satellitenserver, mit dem sich Ihre bwLehrpool-Suite standardmäßig verbindet, betrieben.
          Falls Sie dort keinen Ansprechpartner finden, können Sie sich an das
          <a href="mailto:bwlehrpool@hs-offenburg.de" class="link underline ripple"
            >Entwickler-Team von bwLehrpool
            <OpenInBlank />
          </a>
          wenden.
        </p>
      </section>
    </template>
  </Card>
</template>

<script setup>
import Card from '@/components/Card.vue';
import OpenInBlank from '@/components/OpenInBlank.vue';
</script>

<style scoped>
.pp-section {
  padding-block: 1rem;

  &:last-of-type {
    padding-block-end: 0;
  }
}
</style>
