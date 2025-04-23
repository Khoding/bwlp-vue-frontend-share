For the translation

We need a Title, it's the same in the menu and on the page, so we could do

```json
{
  "userAgreement": {
    "title": "Nutzungsvereinbarung",
    "subtitle": "bwLehrpool-Suite (Dozentenmodul)",
    // The "second subtitle" here (copyright), shouldn't change between languages "Copyright" is universal
    // 2016 is the year of the program, and then "Universität Freiburg" is a Name and shouldn't change
    // So maybe we include it in the translation files just so we can find all of the text of the website at the same place, but it's not translated


    // The paragraphs part I don't know
    "para1": "Die Verwendung dieses Programms ist nur in Abstimmung mit der jeweils beteiligten Hochschulinstitution zulässig und unterliegt deren Bestimmungen und Einschränkungen. Im Rahmen des bwLehrpool-Systems erstellte und bereitgestellte Virtuelle Maschinen, die unfrei lizensierte Software enthalten, dürfen nur mit Erlaubnis bzw. Lizenzierung der betreffenden Rechteinhaber eingesetzt und weitergegeben werden.",
    "para2": "Insbesondere wird ausdrücklich darauf hingewiesen, dass die Verantwortung in Bezug auf eventuell notwendige Lizenzierung sämtlicher Software innerhalb einer Virtuellen Maschine, regelmäßiger Aktualisierung und rechtzeitigen Einspielens von Sicherheitsupdates ausschließlich beim erstellenden Personal liegt.",

    // Then we have licensing, so since it also has a "subtitle" and two paragraphs (one of them has a link), it could be done like this
    "licensing": {
      "title": "Lizenzierung des Programms",
      "para1": "Die bwLehrpool-Suite (Dozentenmodul) ist lizenziert unter der MIT-Lizenz."
      "para2": "ganz genau Mutterfickern or sum' Idek"
    }
  },
}
```

For the Tables, since we're hoping to give the user the ability to show the columnns they want (as in toggle them on and off), we should make the columns not strictly columns names but "types" kinda, meaning they'd be in the same parent as every other translatable text part of an object (objects being Images or Lectures)
