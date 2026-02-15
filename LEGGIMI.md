# Ordiniamo/Let's Sort (OLS) - Presentazione (03/02/2026)

Il software __Ordiniamo/Let's Sort (OLS)__ è un'applicazione Open Source, scritta in JavaScript, per l'esplorazione e la manipolazione di collezioni di dati in formato JSON.
I sorgenti di __Ordiniamo/Let's Sort (OLS)__ sono distribuiti sotto licenza GPL v. 3.0.
I file che costituiscono la libreria DDJ, su cui si basa il programma OLS, sono invece distribuiti con licenza LGPL v. 3.0.

### Il programma OLS non è un programma fatto finito e funzionante pronto per essere usato dagli utenti finali, ma un cantiere aperto in continua evoluzione per cui può contenere degli errori e manifestare talvolta dei fenomeni di malfunzionamento.


Il programma __Ordiniamo/Let's Sort (OLS)__ è uno strumento tecnico per l'esplorazione e la manipolazione di collezioni di dati in formato JSON o formati alternativi,
OLS supporta un'ampia gamma di fonti consentendo di caricare le collezioni di dati dai tradizionali file salvati su disco, scaricare tabelle ospitate su un WebServer, si può ricorrere al copia e incolla, ma può anche essere integrato con alti programmi JavaScript per essere usato a scopo di debug per prendere visione dei valori contenuti in strutture dati complesse che potrebbero essere difficili da studiare con i normali debugger.

Il programma __Ordiniamo/Let's Sort (OLS)__ è stato creato nell'ambito di un'attività didattica avente lo scopo di consentire ad alcuni studenti, esclusi dalla PCTO, di fare una esperienza lavorativa simulata. svolgendo delle attività lavorative simili a quelle che potrebbero farsi in azienda.
Il programma __Ordiniamo/Let's Sort (OLS)__ è fondamentalmente un dimostratore tecnologico che enfatizza le possibilità creative della terna HTML5 + CSS3 + JS allo scopo di catturare l'attenzione degli studenti e farli appassionare alla programmazione in JavaScript. Date queste premesse gli obiettivi didattici prevalgono su ogni altro requisito anche quelli concernenti la sicurezza, 

### si sconsiglia pertanto il suo impiego in tutti quei contesti in cui l'utilizzo di OLS potrebbe costituire una breccia nella sicurezza  dei sistemi informatici degli utenti.
A questo proposito si osserva che il programma __Ordiniamo/Let's Sort (OLS)__ è il prototipo di uno strumento per sviluppatori ed è pensato per essere utilizzato da utenti competenti e responsabili, che sanno ciò che fanno e se ne assumono le responsabilità. Non è uno strumento per utenti finali.
Il programma __Ordiniamo/Let's Sort (OLS)__ non è un database transazionale e non vuole esserlo, ma piuttosto un datawarehouse  intesa come "una collezione o aggregazione di dati strutturati, provenienti da fonti interne operazionali (DBMS) ed esterne al sistema informativo aziendale, utili ad analisi e rapporti informativi".

Il software OLS può essere usato in vari modi:

- per esplorare e/o manipolare strutture dati già presenti nella memoria del browser o caricate da un file esterno,
- per monitorare l'evoluzione nel tempo dei risultati dell'elaborazione di un programma sotto test,
- per prendere visione delle proprietà di una collezione verificandone l'aderenza alle specifiche per poi eventualmente "ripulirla" effettuando il cosiddetto data cleaning,
- per cambiare la rappresentazione dei dati di una collezione convertendone il tracciato record e il formato dei campi,
- o più semplicemente si può integrare la libreria DDJ in un altro programma per usarne le funzioni di esplorazione e visualizzazione dei dati.


Va sa sé che le operazioni concernenti la modifica e la riorganizzazione dei dati di una collezione possono andare a detrimento dell'integrità della collezione.

### La salvaguardia dell'integrità dei dati contenuti nelle collezioni viene lasciata alla responsabilità dell'operatore.

Comunque, come misura precauzionale, le collezioni di dati vengono aperte per default in modalità Read Only, in modo che sia possibile esplorarle prendendone visione, ma non modificarle. Se l'operatore decide di commutare la modalità di funzionamento abilitando le modifiche (modalità Read/Write) si assume la responsabilità dei danni che potrebbero essere arrecati alle strutture dati.

## Caratteristiche

- Supporto di differenti schemi di rappresentazione dei dati in formato JSON (array, oggetti, array di record, array di oggetti, array associativi di record e array associativi di oggetti).
- Supporto tracciati record arbitrari.
- Possibilità di esplorare le collezioni di dati rappresentandole sotto forma di tabelle o di schede.
- Possibilità di abbinare ad una stessa collezione di dati viste utente (UsrView) alternative.
- Possibilità di trasporre le righe con le colonne.
- Possibilità di convertire automaticamente le collezioni di dati da uno schema JSON all'altro e di salvarle.
- Possibilità di estrarre e riorganizzare sottoinsiemi di dati e di salvarli.
- Supporto di collezioni di dati multimediali (immagini, audio, video, formule matematiche, coordinate GPS).
- Supporto di dati ipertestuali. Nei campi dei record si possono inserire dei link che rimandano a record di altre tabelle di OLS o a documenti accessibili tramite Web.
- Supporto dei tipi di data di HTML-5 (date, datetime, datetime-local).
- Supporto tipo JavaScript "bigdata".
- Supporto formati JSON, CSV, FLR, DBF, TOON.
- Molteplici filtri di ricerca corrispondenti ad altrettante modalità di selezione dei dati (data query).
- Possibilità di navigare all'interno delle collezioni di dati esplorandole interattivamente.
- Supporto di tabelle caratterizzate da dati "sparsi" ovvero da colonne prevalentemente vuote.
- Data driven. Possibilità associare una vista utente (user view) al tracciato record di una collezione personalizzando la sua rappresentazione e l'interfaccia utente.
- Supporto di collezioni di dati attive. Gestione di collezioni di dati che si modificano nel corso dell'esecuzione (a run time) ricevendo aggiornamenti da fonti diverse tramite HTTP.
- Riconoscimento automatico dello schema di rappresentazione dei dati.
- Funzioni automatiche di validazione e colorazione dei dati con segnalazione delle incongruenze.
- Help contestuale.
- Il software Ordiniamo/Let's Sort (OLS) non richiede installazione. La corrispondente pagina Web può essere salvata direttamente sul harddisk locale.
  Nota: le collezioni di dati devono essere salvate separatamente dall'applicazione.
- Codice open-source rilasciato con licenza GNU GPL v. 3.0 e GNU LGPL v. 3.0.

## Caratteristiche della versione Sperimentale (NON ancora Rilasciate)

- Interfaccia in linguaggio Naturale.
- FileManager (richiede la disponibilità di XAMPP e l'installazione di codice PHP).
- Vista Calendario.
- Supporto coordinate GPS collegamento a OpenStreetMap.
- Possibilità di interagire con dispositivi di Internet delle Cose (IoT).
  - Theremino.
  - ESP8266.
- Assistente Virtuale Personale
- Impiego come sistema per la gestione della conoscenza (KBS).